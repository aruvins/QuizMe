

const useChatGPT = (text) => {
    console.log(text);
    const messages = [
        {"role": "user", "content": "Create 10 questions from the following text."},
        {"role": "user", "content": text}
    ]
    let data = fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        "Authorization": "Bearer " + process.env.TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
         "model": "gpt-3.5-turbo", 
         "messages": messages
        })
})
   .then(response => response.json())
   return data;
}

export default async function handler(req, res) {
    const request_data = JSON.parse(req.body);
    const text = request_data.text
    console.log("text", text)
    if (text === undefined){
        res.status(500).json({"Error": "user text is undefined."})
        return
    }
    try{
        let data = await useChatGPT(text);
        res.status(200).json({"questions": data});
    }catch(e) {
        res.status(500).json({Error: e})
    }
  }
  