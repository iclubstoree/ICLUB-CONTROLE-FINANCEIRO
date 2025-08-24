import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/analises/analisesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditAnalises = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'total_saidas': '',

    quantidade_lancamentos: '',

    'ticket_medio': '',

    'percentual_recorrentes': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { analises } = useAppSelector((state) => state.analises)

  const { analisesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: analisesId }))
  }, [analisesId])

  useEffect(() => {
    if (typeof analises === 'object') {
      setInitialValues(analises)
    }
  }, [analises])

  useEffect(() => {
      if (typeof analises === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (analises)[el])

          setInitialValues(newInitialVal);
      }
  }, [analises])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: analisesId, data }))
    await router.push('/analises/analises-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit analises')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit analises'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="TotaldeSaídas"
    >
        <Field
            type="number"
            name="total_saidas"
            placeholder="TotaldeSaídas"
        />
    </FormField>

    <FormField
        label="QuantidadedeLançamentos"
    >
        <Field
            type="number"
            name="quantidade_lancamentos"
            placeholder="QuantidadedeLançamentos"
        />
    </FormField>

    <FormField
        label="TicketMédio"
    >
        <Field
            type="number"
            name="ticket_medio"
            placeholder="TicketMédio"
        />
    </FormField>

    <FormField
        label="PercentualdeRecorrentes"
    >
        <Field
            type="number"
            name="percentual_recorrentes"
            placeholder="PercentualdeRecorrentes"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/analises/analises-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditAnalises.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditAnalises
