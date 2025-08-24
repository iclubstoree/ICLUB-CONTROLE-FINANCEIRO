import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/configuracoes/configuracoesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    dias_proximas: '',

    itens_por_pagina: '',

    ordenacao_data: 'ascendente',

    moeda: 'BRL',

    formato_data: 'AAAA-MM-DD',

    idioma: 'pt-BR',

    fuso: 'America/Belem',

}

const ConfiguracoesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/configuracoes/configuracoes-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
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

ConfiguracoesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ConfiguracoesNew
