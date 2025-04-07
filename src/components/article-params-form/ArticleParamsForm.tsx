import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsForm = {
	stateArticle: ArticleStateType;
	setStateArticle: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	stateArticle,
	setStateArticle,
}: ArticleParamsForm) => {
	const [stateParams, setStateParams] =
		useState<ArticleStateType>(stateArticle);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleSelectChange = (key: string, value: OptionType) => {
		setStateParams({ ...stateParams, [key]: value });
	};
	const handleSubmitForm = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setStateArticle(stateParams);
	};

	const handleResetForm = () => {
		setStateParams(defaultArticleState);
		setStateArticle(defaultArticleState);
	};
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<h2 className={styles.form__title}>Задайте параметры</h2>
					<Select
						selected={stateParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) => {
							handleSelectChange('fontFamilyOption', options);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={stateParams.fontSizeOption}
						onChange={(options) => {
							handleSelectChange('fontSizeOption', options);
						}}
					/>
					<Select
						selected={stateParams.fontColor}
						options={fontColors}
						onChange={(options) => {
							handleSelectChange('fontColor', options);
						}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={stateParams.backgroundColor}
						options={backgroundColors}
						onChange={(options) => {
							handleSelectChange('backgroundColor', options);
						}}
						title='Цвет фона'
					/>
					<Select
						selected={stateParams.contentWidth}
						options={contentWidthArr}
						onChange={(options) => {
							handleSelectChange('contentWidth', options);
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
