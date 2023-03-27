import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('zod test', () => {
	it('verified', () => {
		const FormData = z.object({
			subject: z.enum(['topic1', 'topic2', 'topic3']),
			email: z.string().email(),
			body: z.string().min(10).max(5000)
		});
		const result = FormData.safeParse({
			subject: 'topic3',
			email: 'sample@sample.com',
			body: 'this is body'
		});
	});
});
