function processData(text) {
  var output_array = text.split("\n");
  let filtered = output_array.filter((element) => element);

  var count = 0;
  var output_object_array = [];

  while (count < filtered.length) {
    var object = {};
    object.question = filtered[count];
    count = count + 1;
    object.answer = filtered[count];
    output_object_array.push(object);
    count = count + 1;
  }

  console.log(output_object_array)

  return output_object_array;
}

const useChatGPT = (text) => {
  const messages = [
    {
      role: "user",
      content:
        "Create 10 questions from the following text and provide the answers to those questions. Deliminate questions and answers with a newline character",
    },
    { role: "user", content: text },
  ];
  let data = fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.TOKEN,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  }).then((response) => response.json());
  return data;
};

export default async function handler(req, res) {
  const request_data = JSON.parse(req.body);
  const text = request_data.text;
  if (text === undefined) {
    res.status(500).json({ Error: "user text is undefined." });
    return;
  }
  try {
    let data = await useChatGPT(text);
    let string = data.choices[0].message.content;
    let processedData = processData(string);
    res.status(200).json({ output_array: processedData });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
}