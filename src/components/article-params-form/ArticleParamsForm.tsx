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
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useClickOverlay } from '../../hooks/useClickOverlay';
import { Text } from '../../ui/text/Text';

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
	const sidebarRef = useRef<HTMLElement>(null);

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

	useClickOverlay(sidebarRef, () => setIsOpen(false));

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} family='open-sans' uppercase>
						Задайте параметры
					</Text>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
