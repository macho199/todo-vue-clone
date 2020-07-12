
const STORAGE_KEY = 'todos-vuejs';

export default {
	save(todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
}