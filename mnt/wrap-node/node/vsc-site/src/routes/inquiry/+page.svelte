<script lang="ts">
	import EditorPane from '$lib/components/editor-pane/index.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { z } from 'zod';
	import { ContactForm, type ContactFormErrors } from './validate';

	let subject = '';
	let email = '';
	let body = '';
	let errors: ContactFormErrors | undefined;

	const onClickSend = () => {
		try {
			const values = { subject, email, body };
			ContactForm.parse(values);

			// TODO: send form data

			toast.push('inquiry sent');
		} catch (error) {
			if (error instanceof z.ZodError) {
				errors = error.flatten();
				toast.push('入力エラー');
			}
		}
	};
</script>

<EditorPane>
	<h1 class="text-3xl text-gray-50 mt-8 mb-8">Do you want to contact me?</h1>
	<div class="px-4">
		<p class="mb-4">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos totam pariatur sint autem impedit
			id neque, eaque commodi doloremque soluta deserunt sit aut sequi facilis tempora dolores
			dignissimos ipsa iusto.
		</p>
		<form class="text-gray-800">
			<div class="field field-short">
				<label for="subject">Subject</label>
				<select
					id="subject"
					class="text-sm"
					class:outline={errors?.fieldErrors.subject}
					class:outline-4={errors?.fieldErrors.subject}
					class:outline-red-400={errors?.fieldErrors.subject}
					bind:value={subject}
				>
					<option value="">Select a topic</option>
					<option value="topic1">topic1</option>
					<option value="topic2">topic2</option>
					<option value="topic3">topic3</option>
				</select>
				{#if errors?.fieldErrors.subject}
					{#each errors.fieldErrors.subject as error}
						<div class="text-red-500">{error}</div>
					{/each}
				{/if}
			</div>
			<div class="field field-short">
				<label for="email">Email</label>
				<input
					type="email"
					class="text-sm placeholder:text-gray-300"
					placeholder="sample@sample.com"
					class:outline={errors?.fieldErrors.email}
					class:outline-4={errors?.fieldErrors.email}
					class:outline-red-400={errors?.fieldErrors.email}
					bind:value={email}
				/>
				{#if errors?.fieldErrors.email}
					{#each errors.fieldErrors.email as error}
						<div class="text-red-500">{error}</div>
					{/each}
				{/if}
			</div>
			<div class="field">
				<label for="body">Body</label>
				<textarea
					name="body"
					id="body"
					bind:value={body}
					class:outline={errors?.fieldErrors.body}
					class:outline-4={errors?.fieldErrors.body}
					class:outline-red-400={errors?.fieldErrors.body}
				/>
				{#if errors?.fieldErrors.body}
					{#each errors.fieldErrors.body as error}
						<div class="text-red-500">{error}</div>
					{/each}
				{/if}
			</div>
			<button
				type="button"
				class="py-1 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
				on:click={onClickSend}>send</button
			>
		</form>
	</div>
</EditorPane>

<style lang="postcss">
	form {
		@apply max-w-[65ch];
	}
	.field {
		@apply mb-4;
	}
	.field-short {
		@apply max-w-[30ch];
	}
	label {
		@apply text-white block mb-1;
	}
	input,
	textarea,
	select {
		@apply w-full;
	}
	textarea {
		@apply h-32;
	}
</style>
