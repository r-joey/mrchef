import  { GoogleGenerativeAI } from "@google/generative-ai"; 
import { PRIVATE_GOOGLE_API_KEY } from '$env/static/private'
const genAI = new GoogleGenerativeAI(PRIVATE_GOOGLE_API_KEY); 
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData(); 
        const raw_ingredients = formData.get("raw_ingredients");

        // validate image
        if (!raw_ingredients) {
            return fail(400, { error: true, message: "Please upload an image" });
        }
        // validate file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(raw_ingredients.type)) {
            return fail(400, { error: true, message: "Please upload an image" });
        }
        // validate file size
        const maxSize = 10 * 1024 * 1024;
        if (raw_ingredients.size > maxSize) {
            return fail(400, { error: true, message: "Image too large" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const arrayBuffer = await raw_ingredients.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64'); 
         
        
        const image = {
            inlineData: {
              data: base64Image,
              mimeType: raw_ingredients.type,
            },
          };


        const prompt = "Suggest a recipe based on the ingredients from the photo.";
        const result = await model.generateContent([prompt, image]);
        const response = await result.response; 

        return {
            success: true,
            response: response.text()
        }
    }
}