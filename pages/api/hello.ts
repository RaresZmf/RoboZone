import type { NextApiRequest, NextApiResponse } from 'next'
import openai from '../../utils/openai'; 

type ResponseData = {
  message: string
}

export default async function openAiBot(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { prompt } = req.body

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });
    const response = chatCompletion.data.choices[0].message.content;
    res.status(200).json(response)
}

// export default async function openAiBot(req, res) {

//   const 

//   const chatCompletion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Holla" }],
//   });
//   const response = chatCompletion.data.choices[0].message.content;
//   res.status(200).json(prompt);
// }
