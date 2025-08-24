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

import { create } from '../../stores/dre/dreSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    receita_bruta: '',

    cmv_cpv: '',

    lucro_bruto: '',

    despesas_operacionais: '',

    resultado_operacional: '',

    outras_receitas: '',

    resultado_liquido: '',

}

const DreNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/dre/dre-list')
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
        label="ReceitaBruta"
    >
        <Field
            type="number"
            name="receita_bruta"
            placeholder="ReceitaBruta"
        />
    </FormField>

    <FormField
        label="CMV/CPV"
    >
        <Field
            type="number"
            name="cmv_cpv"
            placeholder="CMV/CPV"
        />
    </FormField>

    <FormField
        label="LucroBruto"
    >
        <Field
            type="number"
            name="lucro_bruto"
            placeholder="LucroBruto"
        />
    </FormField>

    <FormField
        label="DespesasOperacionais"
    >
        <Field
            type="number"
            name="despesas_operacionais"
            placeholder="DespesasOperacionais"
        />
    </FormField>

    <FormField
        label="ResultadoOperacional"
    >
        <Field
            type="number"
            name="resultado_operacional"
            placeholder="ResultadoOperacional"
        />
    </FormField>

    <FormField
        label="OutrasReceitas"
    >
        <Field
            type="number"
            name="outras_receitas"
            placeholder="OutrasReceitas"
        />
    </FormField>

    <FormField
        label="ResultadoLíquido"
    >
        <Field
            type="number"
            name="resultado_liquido"
            placeholder="ResultadoLíquido"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/dre/dre-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

DreNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default DreNew
