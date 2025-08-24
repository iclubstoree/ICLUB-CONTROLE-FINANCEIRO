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

import { update, fetch } from '../../stores/centros_de_custo/centros_de_custoSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditCentros_de_custo = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'nome': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { centros_de_custo } = useAppSelector((state) => state.centros_de_custo)

  const { centros_de_custoId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: centros_de_custoId }))
  }, [centros_de_custoId])

  useEffect(() => {
    if (typeof centros_de_custo === 'object') {
      setInitialValues(centros_de_custo)
    }
  }, [centros_de_custo])

  useEffect(() => {
      if (typeof centros_de_custo === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (centros_de_custo)[el])

          setInitialValues(newInitialVal);
      }
  }, [centros_de_custo])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: centros_de_custoId, data }))
    await router.push('/centros_de_custo/centros_de_custo-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit centros_de_custo')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit centros_de_custo'} main>
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
        label="Nome"
    >
        <Field
            name="nome"
            placeholder="Nome"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/centros_de_custo/centros_de_custo-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditCentros_de_custo.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditCentros_de_custo
