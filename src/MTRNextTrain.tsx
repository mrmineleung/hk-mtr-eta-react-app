import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Table, Button, Row, Col, Alert, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import { useTranslation } from 'react-i18next';

import Dropdown from './customize/Dropdown';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import mtr_line_menu from './data/Menu'

interface Props {
	children?: React.ReactNode;
	theme: string;
}

const MTRNextTrain: React.FC<Props> = ({ theme }) => {

	const [trainData, setTrainData] = useState<{ up: [], down: [] }>({ up: [], down: [] });
	const [urlParam, setUrlParam] = useState<{ mtr_line: any, mtr_sta: any }>(() => {
		return localStorage.getItem('selected_mtr_line') !== null && localStorage.getItem('selected_mtr_sta') !== null ?
			{ mtr_line: localStorage.getItem('selected_mtr_line'), mtr_sta: localStorage.getItem('selected_mtr_sta') } :
			{ mtr_line: mtr_line_menu[0].code, mtr_sta: mtr_line_menu[0].submenu[0].code }
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isRefresh, setIsRefresh] = useState<boolean>(true);
	const [isSpecialTrainServicesArrangement, setIsSpecialTrainServicesArrangement] = useState<boolean>(false);
	const [isDelay, setIsDelay] = useState<boolean>(false);
	const [specialTrainServicesArrangement, setSpecialTrainServicesArrangement] = useState<{ message: string, url: string }>({ message: '', url: '' });
	const [weatherWarningMessage, setWeatherWarningMessage] = useState<string[]>(['']);
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date())
	const [t, i18n] = useTranslation();
	const [isOpenNotice, setIsOpenNotice] = useState<string>('1');



	const handleRefreshButton = () => {
		setIsRefresh(!isRefresh)
		setLastUpdateTime(new Date())
	}

	const handleSavedUrlParam = (line: string, sta: string) => {
		localStorage.setItem('selected_mtr_line', line)
		localStorage.setItem('selected_mtr_sta', sta)
		setUrlParam({ mtr_line: line, mtr_sta: sta })
	}

	useEffect(() => {
		let lang

		switch (i18n.language) {
			case 'en': lang = 'en'
				break
			case 'zh': lang = 'tc'
				break
			default: lang = 'en'
		}

		fetch(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${urlParam.mtr_line}&sta=${urlParam.mtr_sta}&lang=${lang}`, { keepalive: true })
			.then(response => {
				setIsLoading(true)
				return response.json()
			})
			.then(data => {
				console.log(data)
				setIsError(false)
				setIsSpecialTrainServicesArrangement(false)

				if (data.status === 1) {
					let name = `${urlParam.mtr_line}-${urlParam.mtr_sta}`
					let { UP: up, DOWN: down } = data.data[name]
					console.log("up", up, "down", down)
					if (up === null || up === undefined) {
						up = [{ curr_time: null, time: null, plat: null, dest: null, ttnt: null }]
					}

					if (down === null || down === undefined) {
						down = [{ curr_time: null, time: null, plat: null, dest: null, ttnt: null }]
					}
					setTrainData({ up: up, down: down })
					setIsDelay(data.isdelay === 'Y' ? true : false)
				} else if (data.status === 0) {
					setIsSpecialTrainServicesArrangement(true)
					setSpecialTrainServicesArrangement({ message: data.message, url: data.url })
				}
				setTimeout(function () {
					setIsLoading(false)
				}, 10000);

			})
			.catch(error => {
				console.error(error)
				setIsError(true)
				setTimeout(function () {
					setIsLoading(false)
				}, 10000);
				setIsRefresh(false)
				setIsSpecialTrainServicesArrangement(false)
			})


		fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`, { keepalive: true })
			.then(response => response.json())
			.then(data => {
				console.log(data)
				setIsLoading(true)
				setIsError(false)
				let warningMessage = data.warningMessage
				setWeatherWarningMessage(warningMessage)
				setTimeout(function () {
					setIsLoading(false)
				}, 1000);


			})
			.catch(error => {
				console.error(error)
				setIsError(true)
				setTimeout(function () {
					setIsLoading(false)
				}, 1000);
			})

	}
		, [urlParam, isRefresh, i18n.language])

	return (
		<>
			<Container>
				<h1>MTR Next Train</h1>
				<Row className="justify-content-md-center" md="2" sm="2" xs="1">
					<Col>
						<Dropdown title={t(`line_${urlParam.mtr_line}_label`)}
							datasource={mtr_line_menu}
							theme={theme}
							returnUrlParam={(line, sta) => handleSavedUrlParam(line, sta)}>
						</Dropdown>
					</Col>
					<Col>
						<Dropdown title={t(`sta_${urlParam.mtr_sta}_label`)}
							datasource={mtr_line_menu}
							theme={theme}
							returnUrlParam={(line, sta) => handleSavedUrlParam(line, sta)}
							parentId={urlParam.mtr_line}>
						</Dropdown>
					</Col>
				</Row>
				<p></p>
				<p></p>
				<Row className="justify-content-md-center">
					<Col>
						<Button color={theme === 'dark' ? theme : 'info'} onClick={() => handleRefreshButton()} size="lg" block>{t('refresh_button_label')}</Button>
					</Col>
				</Row>


				{isError ? (<p>Error occurs. Try again. </p>) : (null)}
				{isSpecialTrainServicesArrangement ?
					(<Alert color={theme === 'dark' ? theme : 'danger'}>
						{specialTrainServicesArrangement.message} {specialTrainServicesArrangement.url !== null || specialTrainServicesArrangement.url !== undefined ? (<a href={specialTrainServicesArrangement.url}>Link</a>) : (null)}
					</Alert>) : (null)}

				<br></br>

				{
					weatherWarningMessage ? <Accordion open={isOpenNotice} {...{
						toggle: (id) => {
							if (isOpenNotice === id) {
								setIsOpenNotice('');
							} else {
								setIsOpenNotice(id);
							}
						}
					}}>
						<AccordionItem>
							<AccordionHeader targetId="1">{t('weather_warning_label')}</AccordionHeader>
							<AccordionBody accordionId="1">
								{weatherWarningMessage.map(str => <p>{str}</p>)}
							</AccordionBody>
						</AccordionItem>
					</Accordion> : null}
				<br />


				{isDelay ? (<Row><Col><Alert color={theme === 'dark' ? theme : 'danger'}>Train service is delayed</Alert></Col></Row>) : (null)}

				<Row><Col><Alert color={theme === 'dark' ? theme : 'info'}>
					{t('current_time_label')} : <Moment format='yyyy-MM-DD HH:mm:ss' interval={1000} onChange={() => setCurrentTime(new Date())} tz="Asia/Hong_Kong">
						{currentTime}
					</Moment> HKT
				</Alert></Col></Row>
				{t('last_update_label')} : <Moment format='yyyy-MM-DD HH:mm:ss' interval={10000} onChange={() => { handleRefreshButton(); setLastUpdateTime(new Date()) }} tz="Asia/Hong_Kong">
					{lastUpdateTime}
				</Moment> HKT
				<Table className="mt-3" dark={theme === 'dark'}>
					<thead>
						<tr><th colSpan={3}>{t('to_label')} {mtr_line_menu.filter(menu => menu.code === urlParam.mtr_line).map(item => t(`sta_${item.submenu[item.submenu.length - 1].code}_label`))} (UP)</th></tr>
						<tr>
							<th className={"w-25"}>{t('destination_label')}</th>
							<th className={"w-25"}>{t('platform_label')}</th>
							<th className={"w-25"}>{t('minutes_left_label')}</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? <tr><td colSpan={3}><SkeletonLoader background={theme === 'dark' ? '#444444' : '#eff1f6'} /></td></tr> :
							trainData.up.map((item: any) => (
								<tr key={item.curr_time + item.ttnt + Math.floor(Math.random() * 100000)}>
									<td className={"w-25"}>{item.dest === null ? '-' : mtr_line_menu.filter(menu_item => menu_item.code === urlParam.mtr_line)[0].submenu.filter(sta => sta.code === item.dest).map(sta => t(`sta_${sta.code}_label`))}{item.route !== null && item.route === 'RAC' ? ' (Via Racecourse station)' : ''}</td>
									<td className={"w-25"}>{item.plat === null ? '-' : `${item.plat}`}</td>
									<td className={"w-25"}>{item.ttnt === null ? '-' : `${item.ttnt} ${t('minutes_label')}`} {item.time === null ? '' : <Moment format='(HH:mm)'>
										{item.time}
									</Moment>} {item.timeType !== null && item.timeType === 'D' ? `*${t('departure_label')}` : ''}{item.timeType !== null && item.timeType === 'A' ? `*${t('arrival_label')}` : ''}</td>
								</tr>
							))}
					</tbody>
				</Table>


				<Table className="mt-3" dark={theme === 'dark'}>
					<thead>
						<tr><th colSpan={3}>{t('to_label')} {mtr_line_menu.filter(menu => menu.code === urlParam.mtr_line).map(item => t(`sta_${item.submenu[0].code}_label`))} (DOWN)</th></tr>
						<tr>
							<th className={"w-25"}>{t('destination_label')}</th>
							<th className={"w-25"}>{t('platform_label')}</th>
							<th className={"w-25"}>{t('minutes_left_label')}</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? <tr><td colSpan={3}><SkeletonLoader background={theme === 'dark' ? '#444444' : '#eff1f6'} /></td></tr> :
							trainData.down.map((item: any) => (
								<tr key={item.curr_time + item.ttnt + Math.floor(Math.random() * 100000)}>
									<td className={"w-25"}>{item.dest === null ? '-' : mtr_line_menu.filter(menu_item => menu_item.code === urlParam.mtr_line)[0].submenu.filter(sta => sta.code === item.dest).map(sta => t(`sta_${sta.code}_label`))}{item.route !== null && item.route === 'RAC' ? ' (Via Racecourse station)' : ''}</td>
									<td className={"w-25"}>{item.plat === null ? '-' : `${item.plat}`}</td>
									<td className={"w-25"}>{item.ttnt === null ? '-' : `${item.ttnt} ${t('minutes_label')}`} {item.time === null ? '' : <Moment format='(HH:mm)'>
										{item.time}
									</Moment>} {item.timeType !== null && item.timeType === 'D' ? `*${t('departure_label')}` : ''}{item.timeType !== null && item.timeType === 'A' ? `*${t('arrival_label')}` : ''}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default MTRNextTrain;