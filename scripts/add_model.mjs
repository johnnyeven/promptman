import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const timestamp = new Date().getTime()
    const model1 = await prisma.t_model.create({
        data: {
            name: "neverend",
            description: "Neverend Dream",
            api_type: 1,
            api_entry: "ws://121.40.85.249:23456",
            api_default_params: {
                negative_prompt: '(nsfw:2),(worst quality:2),(low quality:2)',
                num_inference_steps: 20,
                width: 768,
                height: 512,
                guidance_scale: 7.5,
                rand_seed: -1
            },
            created_at: timestamp,
            updated_at: timestamp,
        }
    })
    console.log(model1)

    const model2 = await prisma.t_model.create({
        data: {
            name: "dreamlike",
            description: "Dreamlike Photoreal",
            api_type: 1,
            api_entry: "wss://f284-54-80-185-234.ngrok-free.app",
            api_default_params: {
                negative_prompt: '(nsfw:2),(worst quality:2),(low quality:2)',
                num_inference_steps: 20,
                width: 768,
                height: 512,
                guidance_scale: 7.5,
                rand_seed: -1
            },
            created_at: timestamp,
            updated_at: timestamp,
        }
    })
    console.log(model2)

    const model3 = await prisma.t_model.create({
        data: {
            name: "shinkai",
            description: "Shinkai style",
            api_type: 1,
            api_entry: "wss://f284-54-80-185-234.ngrok-free.app",
            api_default_params: {
                negative_prompt: '(nsfw:2),(worst quality:2),(low quality:2)',
                num_inference_steps: 20,
                width: 768,
                height: 512,
                guidance_scale: 7.5,
                rand_seed: -1
            },
            created_at: timestamp,
            updated_at: timestamp,
        }
    })
    console.log(model3)
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect();
    })