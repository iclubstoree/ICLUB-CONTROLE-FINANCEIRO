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

import { update, fetch } from '../../stores/configuracoes/configuracoesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditConfiguracoes = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    dias_proximas: '',

    itens_por_pagina: '',

    ordenacao_data: '',

    moeda: '',

    formato_data: '',

    idioma: '',

    fuso: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { configuracoes } = useAppSelector((state) => state.configuracoes)

  const { configuracoesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: configuracoesId }))
  }, [configuracoesId])

  useEffect(() => {
    if (typeof configuracoes === 'object') {
      setInitialValues(configuracoes)
    }
  }, [configuracoes])

  useEffect(() => {
      if (typeof configuracoes === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (configuracoes)[el])

          setInitialValues(newInitialVal);
      }
  }, [configuracoes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: configuracoesId, data }))
    await router.push('/configuracoes/configuracoes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit configuracoes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit configuracoes'} main>
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
        label="DiasparaPróximas"
    >
        <Field
            type="number"
            name="dias_proximas"
            placeholder="DiasparaPróximas"
        />
    </FormField>

    <FormField
        label="ItensporPágina"
    >
        <Field
            type="number"
            name="itens_por_pagina"
            placeholder="ItensporPágina"
        />
    </FormField>

    <FormField label="OrdenaçãoporData" labelFor="ordenacao_data">
        <Field name="ordenacao_data" id="ordenacao_data" component="select">

            <option value="ascendente">ascendente</option>

            <option value="descendente">descendente</option>

        </Field>
    </FormField>

    <FormField label="Moeda" labelFor="moeda">
        <Field name="moeda" id="moeda" component="select">

            <option value="BRL">BRL</option>

        </Field>
    </FormField>

    <FormField label="FormatodeData" labelFor="formato_data">
        <Field name="formato_data" id="formato_data" component="select">

            <option value="AAAA-MM-DD">AAAA-MM-DD</option>

        </Field>
    </FormField>

    <FormField label="Idioma" labelFor="idioma">
        <Field name="idioma" id="idioma" component="select">

            <option value="pt-BR">pt-BR</option>

        </Field>
    </FormField>

    <FormField label="Fuso" labelFor="fuso">
        <Field name="fuso" id="fuso" component="select">

            <option value="America/Belem">America/Belem</option>

        </Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/configuracoes/configuracoes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditConfiguracoes.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditConfiguracoes
