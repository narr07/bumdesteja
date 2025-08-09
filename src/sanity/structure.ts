import type { StructureResolver } from "sanity/structure";
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			// Singleton untuk Home
			S.listItem()
				.title("Home")
				.id("home")
				.icon(() => "🏠")
				.child(
					S.editor()
						.title("Home")
						.id("home")
						.schemaType("home")
						.documentId("home") // <- ini penting: doc ID selalu 'home'
				),
			// Tambahkan document type list lain jika ada
			// ...existing code...
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					![
						// Tambahkan tipe lain jika ingin di-ignore juga
						"home",
					].includes(item.getId()!)
			),
			// ...existing code...
		]);
