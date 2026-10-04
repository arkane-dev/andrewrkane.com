import type { ThemeRegistrationRaw } from 'shiki';

// Code-block theme built from NEONDECK tokens. Every color passes 4.5:1 on --nd-void (#03040c):
// text 17.4, comments (text-mute) 5.9, punctuation 8.3, magenta 6.4, cyan 14.7, jade 14.0, gold 12.1, violet 6.0, pink 7.4, yellow 16.6, red 5.8.
export const neondeckTheme: ThemeRegistrationRaw = {
	name: 'neondeck',
	type: 'dark',
	colors: { 'editor.background': '#03040c', 'editor.foreground': '#ecebff' },
	// TextMate rules live in `settings` (an empty `settings` array would override `tokenColors`).
	settings: [
		{ settings: { foreground: '#ecebff', background: '#03040c' } },
		{ scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8885b9', fontStyle: 'italic' } },
		{ scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new', 'keyword.control'], settings: { foreground: '#ff2bd6' } },
		{ scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#3ff0b8' } },
		{ scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#f6bd6a' } },
		{ scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#22f2f7' } },
		{ scope: ['entity.name.type', 'support.type', 'entity.name.class', 'entity.other.inherited-class'], settings: { foreground: '#a66bff' } },
		{ scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#ff5fb4' } },
		{ scope: ['entity.other.attribute-name'], settings: { foreground: '#f5ec58' } },
		{ scope: ['variable.parameter'], settings: { foreground: '#f6bd6a', fontStyle: 'italic' } },
		{ scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#a49fd9' } },
		{ scope: ['markup.heading'], settings: { foreground: '#ff2bd6', fontStyle: 'bold' } },
		{ scope: ['markup.inserted'], settings: { foreground: '#3ff0b8' } },
		{ scope: ['markup.deleted'], settings: { foreground: '#ff3b52' } }
	]
};
