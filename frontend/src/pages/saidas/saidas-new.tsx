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

import { create } from '../../stores/saidas/saidasSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    data: '',

    loja: '',

    categoria: '',

    centro_de_custo: '',

    tipo: '',

    descricao: '',

    value: '',

    pago: 'sim',

    recorrencia: 'sim',

    observacoes: '',

}

const SaidasNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/saidas/saidas-list')
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
      label="Data"
  >
      <Field
          type="datetime-local"
          name="data"
          placeholder="Data"
      />
  </FormField>

  <FormField
      label="Loja"
  >
      <Field
          name="loja"
          placeholder="Loja"
      />
  </FormField>

  <FormField
      label="Categoria"
  >
      <Field
          name="categoria"
          placeholder="Categoria"
      />
  </FormField>

  <FormField
      label="CentrodeCusto"
  >
      <Field
          name="centro_de_custo"
          placeholder="CentrodeCusto"
      />
  </FormField>

  <FormField
      label="Tipo"
  >
      <Field
          name="tipo"
          placeholder="Tipo"
      />
  </FormField>

    <FormField label="Descrição" hasTextareaHeight>
        <Field name="descricao" as="textarea" placeholder="Descrição" />
    </FormField>

    <FormField
        label="Valor"
    >
        <Field
            type="number"
            name="value"
            placeholder="Valor"
        />
    </FormField>

  <FormField label="Pago" labelFor="pago">
      <Field name="pago" id="pago" component="select">

        <option value="sim">sim</option>

        <option value="nao">nao</option>

      </Field>
  </FormField>

  <FormField label="Recorrência" labelFor="recorrencia">
      <Field name="recorrencia" id="recorrencia" component="select">

        <option value="sim">sim</option>

        <option value="nao">nao</option>

      </Field>
  </FormField>

    <FormField label="Observações" hasTextareaHeight>
        <Field name="observacoes" as="textarea" placeholder="Observações" />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/saidas/saidas-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

SaidasNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default SaidasNew
