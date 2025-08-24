import React from 'react';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import dataFormatter from '../../helpers/dataFormatter';
import { Pagination } from '../Pagination';
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
  dre: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardDre = ({
  dre,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
    const asideScrollbarsStyle = useAppSelector(
        (state) => state.style.asideScrollbarsStyle,
    );
    const bgColor = useAppSelector((state) => state.style.cardsColor);
    const darkMode = useAppSelector((state) => state.style.darkMode);
    const corners = useAppSelector((state) => state.style.corners);
    const focusRing = useAppSelector((state) => state.style.focusRingColor);

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading && dre.map((item, index) => (
          <li
            key={item.id}
            className={`overflow-hidden ${corners !== 'rounded-full'? corners : 'rounded-3xl'} border ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
              <Link href={`/dre/dre-view/?id=${item.id}`} className='text-lg font-bold leading-6 line-clamp-1'>
                  {item.receita_bruta}
              </Link>

              <div className='ml-auto'>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/dre/dre-edit/?id=${item.id}`}
                  pathView={`/dre/dre-view/?id=${item.id}`}
                  hasUpdatePermission={true}
                />
              </div>
            </div>
            <dl className='divide-y dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>Saídas</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.saidas }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>ReceitaBruta</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.receita_bruta }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>CMV/CPV</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.cmv_cpv }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>LucroBruto</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.lucro_bruto }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>DespesasOperacionais</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.despesas_operacionais }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>ResultadoOperacional</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.resultado_operacional }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>OutrasReceitas</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.outras_receitas }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>ResultadoLíquido</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.resultado_liquido }
                        </div>
                    </dd>
                </div>

            </dl>
          </li>
        ))}
        {!loading && dre.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </ul>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default CardDre;
