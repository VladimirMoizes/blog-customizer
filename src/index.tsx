import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateCurrentApp, setStateCurrentApp] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': stateCurrentApp.fontFamilyOption.value,
					'--font-size': stateCurrentApp.fontSizeOption.value,
					'--font-color': stateCurrentApp.fontColor.value,
					'--container-width': stateCurrentApp.contentWidth.value,
					'--bg-color': stateCurrentApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateArticle={stateCurrentApp}
				setStateArticle={setStateCurrentApp}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
