<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import { toast } from '@zerodevx/svelte-toast';

	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase';
	import { subscribeIgnoreFirst } from '$lib/shared/store/user';
	import EditorPane from '$lib/components/editor-pane/index.svelte';

	let email = 'ideodora@gmail.com';
	let password = '123456';
	let unsubscribe: Unsubscriber | undefined;

	const onClickLogin = async () => {
		try {
			if (unsubscribe) {
				unsubscribe();
			}
			await signInWithEmailAndPassword(auth, email, password);
			unsubscribe = subscribeIgnoreFirst((user) => {
				if (user) {
					toast.push('ログインしたよ');
					goto('/admin');
				}
			});
		} catch (error: any) {
			if (unsubscribe) {
				unsubscribe();
			}
			console.error(error);
			if (error.code) {
				switch (error.code) {
					case 'auth/wrong-password':
						toast.push('パスワードが違います');
						break;
					case 'auth/user-not-found':
						toast.push('ユーザーが存在しません');
						break;
					case 'auth/invalid-email':
						toast.push('メールアドレスが不正です');
						break;

					default:
						toast.push('ログイン失敗');
						break;
				}
			}
		}
	};
	const onClickLogout = async () => {
		await signOut(auth);
		toast.push('ログアウト完了');
	};

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<EditorPane>
	<div class="wrap w-full">
		<form class="login-form max-w-min">
			<div class="field">
				<label for="mail">メールアドレス</label>
				<input id="mail" type="text" bind:value={email} />
			</div>
			<div class="field">
				<label for="password">パスワード</label>
				<input id="password" type="text" bind:value={password} />
			</div>
			<div class="field space-y-2">
				<button type="button" class="login" on:click={onClickLogin}>ログイン</button>
				<button type="button" class="logout" on:click={onClickLogout}>ログアウト</button>
			</div>
		</form>
	</div>
</EditorPane>

<style lang="postcss">
	.login-form {
		@apply flex flex-col gap-y-4 mx-auto;
	}
	.field {
		@apply flex flex-col items-start;
	}
	.field input {
		@apply text-gray-800 text-sm;
	}
	.login {
		@apply bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md py-2 px-4;
	}
	.logout {
		@apply bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md py-2 px-4;
	}
</style>
