import Moment from "react-moment"
import React from "react"
import { Table } from "reactstrap"
import SkeletonLoader from "tiny-skeleton-loader-react"
import menu from "../data/Menu"
import { useTranslation } from "react-i18next"
import { NextTrainDetailsData, NextTrainUrlParam, Theme } from "../MTRNextTrain"


type Destination = 'UP' | 'DOWN'

interface TrainDataTableProps {
    theme: Theme
    urlParam: NextTrainUrlParam
    isLoading: boolean
    trainData: NextTrainDetailsData[]
    destination: Destination
}


const TrainDataTable = ({theme, urlParam, isLoading, trainData, destination} : TrainDataTableProps) => {

    const [t] = useTranslation();

    return <>
    <Table className="mt-3" dark={theme === 'dark'}>
        <thead>
            <tr><th colSpan={3}>{t('to_label')} {menu.filter(menu => menu.code === urlParam.line).map(item => t(`sta_${item.submenu[0].code}_label`))} ({destination})</th></tr>
            <tr>
                <th className={"w-25"}>{t('destination_label')}</th>
                <th className={"w-25"}>{t('platform_label')}</th>
                <th className={"w-25"}>{t('minutes_left_label')}</th>
            </tr>
        </thead>
        <tbody>
            {isLoading ? <tr><td colSpan={3}><SkeletonLoader background={theme === 'dark' ? '#444444' : '#eff1f6'} /></td></tr> :
                trainData.map((item: any) => (
                    <tr key={Math.floor(Math.random() * 100000)}>
                        <td className={"w-25"}>{item.dest === null ? '-' : menu.filter(menu_item => menu_item.code === urlParam.line)[0].submenu.filter(sta => sta.code === item.dest).map(sta => t(`sta_${sta.code}_label`))}{item.route !== null && item.route === 'RAC' ? ' (Via Racecourse station)' : ''}</td>
                        <td className={"w-25"}>{item.plat === null ? '-' : `${item.plat}`}</td>
                        <td className={"w-25"}>{item.ttnt === null ? '-' : `${item.ttnt} ${t('minutes_label')}`} {item.time === null ? '' : <Moment format='(HH:mm)'>
                            {item.time}
                        </Moment>} {item.timeType !== null && item.timeType === 'D' ? `*${t('departure_label')}` : ''}{item.timeType !== null && item.timeType === 'A' ? `*${t('arrival_label')}` : ''}</td>
                    </tr>
                ))}
        </tbody>
    </Table>
    </>
}


export default TrainDataTable