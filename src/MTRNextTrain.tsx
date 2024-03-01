import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Container, Button, Row, Col, Alert, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import Moment from 'react-moment'
import 'moment-timezone'
import { useTranslation } from 'react-i18next'

import Dropdown from './components/TrainMenuDropdown'
import TrainDataTable from './components/TrainDataTable'
import menu from './data/Menu'

export type Theme = 'dark' | ''

interface MTRNextTrainProps {
	theme: string;
}

export interface NextTrainDetailsData {
	curr_time: string
	time: string
	lat: string
	dest: string
	ttnt: string 
}


interface NextTrainData {
	up: NextTrainDetailsData[]
	down: NextTrainDetailsData[]
}

export interface NextTrainUrlParam {
	line: string | null
	station: string | null
}

interface SpecialTrainServicesArrangement {
	message: string
	url: string
}



const MTRNextTrain = ({ theme } : MTRNextTrainProps) => {

	const [trainData, setTrainData] = useState<NextTrainData>({ up: [], down: [] });
	const [urlParam, setUrlParam] = useState<NextTrainUrlParam>(() => {
        return localStorage.getItem("selected_line") !== null &&
            localStorage.getItem("selected_station") !== null
            ? {
                  line: localStorage.getItem("selected_line"),
                  station: localStorage.getItem("selected_station"),
              }
            : { line: menu[0].code, station: menu[0].submenu[0].code }
    })
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isRefresh, setIsRefresh] = useState<boolean>(true);
	const [isSpecialTrainServicesArrangement, setIsSpecialTrainServicesArrangement] = useState<boolean>(false);
	const [isDelay, setIsDelay] = useState<boolean>(false);
	const [specialTrainServicesArrangement, setSpecialTrainServicesArrangement] = useState<SpecialTrainServicesArrangement>({ message: '', url: '' });
	const [weatherWarningMessage, setWeatherWarningMessage] = useState<string[]>(['']);
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date())
	const [t, i18n] = useTranslation();
	const [isOpenNotice, setIsOpenNotice] = useState<string>('1');

	const NEXT_TRAIN_API_URL = 'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php'
	const WEATHER_API_URL = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php'

	const handleRefreshButton = () => {
		setIsRefresh(!isRefresh)
		setLastUpdateTime(new Date())
	}

	const handleSavedUrlParam = (line: string, sta: string) => {
		localStorage.setItem('selected_line', line)
		localStorage.setItem('selected_station', sta)
		setUrlParam({ line: line, station: sta })
	}

	const handleCurrentLanguage = useCallback(() => {
		switch (i18n.language) {
			case 'en': return 'en'
			case 'zh': return 'tc'
			default: return 'en'
		}
	}, 
	[i18n.language])


	useEffect(() => {
        const lang = handleCurrentLanguage()

        const fetchNextTrainData = async () => {
            try {
                setIsLoading(true)
                setIsError(false)

                const response = await fetch(
                    `${NEXT_TRAIN_API_URL}?line=${urlParam.line}&sta=${urlParam.station}&lang=${lang}`,
                    { keepalive: true }
                )
                const data = await response.json()

                setIsSpecialTrainServicesArrangement(false)

                if (data.status === 1) {
                    let name = `${urlParam.line}-${urlParam.station}`
                    let { UP: up, DOWN: down } = data.data[name]
                    // console.log("up", up, "down", down)
                    if (up === null || up === undefined) {
                        up = [
                            {
                                curr_time: null,
                                time: null,
                                plat: null,
                                dest: null,
                                ttnt: null,
                            },
                        ]
                    }

                    if (down === null || down === undefined) {
                        down = [
                            {
                                curr_time: null,
                                time: null,
                                plat: null,
                                dest: null,
                                ttnt: null,
                            },
                        ]
                    }

                    setTrainData({ up: up, down: down })
                    setIsDelay(data.isdelay === "Y" ? true : false)
                } else if (data.status === 0) {
                    setIsSpecialTrainServicesArrangement(true)
                    setSpecialTrainServicesArrangement({
                        message: data.message,
                        url: data.url,
                    })
                }
            } catch (e) {
                console.error(e)
                setIsError(true)
                setIsRefresh(false)
                setIsSpecialTrainServicesArrangement(false)
            } finally {
                setTimeout(function () {
                    setIsLoading(false)
                }, 1000)
            }
        }

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `${WEATHER_API_URL}?dataType=rhrread&lang=${lang}`,
                    { keepalive: true }
                )
                const data = await response.json()

                let warningMessage = data.warningMessage
                setWeatherWarningMessage(warningMessage)
            } catch (e) {
                console.error(e)
            }
        }

        fetchNextTrainData()
        fetchWeatherData()
    }, [urlParam, isRefresh, handleCurrentLanguage])

	return (
		<>
			<Container>
				<h1>MTR Next Train</h1>
				<Row className="justify-content-md-center" md="2" sm="2" xs="1">
					<Col>
						<Dropdown title={t(`line_${urlParam.line}_label`)}
							datasource={menu}
							theme={theme as Theme}
							returnUrlParam={(line, sta) => handleSavedUrlParam(line, sta)}>
						</Dropdown>
					</Col>
					<Col>
						<Dropdown title={t(`sta_${urlParam.station}_label`)}
							datasource={menu}
							theme={theme as Theme}
							returnUrlParam={(line, sta) => handleSavedUrlParam(line, sta)}
							parentId={urlParam.line}>
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
								{weatherWarningMessage.map((str) => <p key={Math.floor(Math.random() * 100000)}>{str}</p>)}
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
				
				<TrainDataTable theme={theme as Theme} urlParam={urlParam} isLoading={isLoading} trainData={trainData.up} destination='UP'/>
				<TrainDataTable theme={theme as Theme} urlParam={urlParam} isLoading={isLoading} trainData={trainData.down} destination='DOWN'/>
			</Container>
		</>
	);
};

export default MTRNextTrain;