import { z } from 'zod';

export const ContactForm = z.object({
	subject: z.enum(['topic1', 'topic2'], {
		errorMap: (issue, ctx) => ({ message: '選択肢から選んでください' })
	}),
	email: z
		.string()
		.email({ message: '不正なメールアドレスです' })
		.max(256, { message: '256文字以下のメールを使ってください' }),
	body: z
		.string()
		.min(10, { message: '10文字以上で入力してください' })
		.max(5000, { message: '5000文字以下で入力してください' })
});

export type ContactFormErrors = z.inferFlattenedErrors<typeof ContactForm>;
