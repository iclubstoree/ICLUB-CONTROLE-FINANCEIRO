import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/saidas/saidasSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const SaidasView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { saidas } = useAppSelector((state) => state.saidas)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View saidas')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View saidas')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/saidas/saidas-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <FormField label='Data'>
                    {saidas.data ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={saidas.data ?
                        new Date(
                          dayjs(saidas.data).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No Data</p>}
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Loja</p>
                    <p>{saidas?.loja}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Categoria</p>
                    <p>{saidas?.categoria}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>CentrodeCusto</p>
                    <p>{saidas?.centro_de_custo}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Tipo</p>
                    <p>{saidas?.tipo}</p>
                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={saidas?.descricao} />
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Valor</p>
                  <p>{saidas?.value || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Pago</p>
                    <p>{saidas?.pago ?? 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Recorrência</p>
                    <p>{saidas?.recorrencia ?? 'No data'}</p>
                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={saidas?.observacoes} />
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/saidas/saidas-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

SaidasView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default SaidasView;
