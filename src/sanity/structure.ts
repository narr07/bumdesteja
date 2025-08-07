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
			...S.documentTypeListItems().filter(
				listItem => listItem.getId() !== "home" // supaya 'home' tidak muncul dua kali di list
			),
		]);
