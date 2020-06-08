import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { SearchResultType } from '../../domain/SearchBox/SearchBox';
import './DetailPage.css';
import { statusCode } from './constants';
import { fetch } from '../../services/fetch';
import { API } from '../../services/config';

type TParams = { id: string };
export interface DetailResultType extends SearchResultType {
  type: string;
  category: string;
  status: string;
  venue: string;
  dateTime: string;
}

const DetailPage = ({
  history,
  match: {
    params: { id },
  },
}: RouteComponentProps<TParams>) => {
  const [data, setData] = useState<DetailResultType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dataRequest = await fetch({ url: `${API.DETAIL_PAGE}/${id}` });
      return dataRequest;
    };

    fetchData().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [id]);

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case statusCode.NOT_STARTED:
        return 'bkgnd-red';
      case statusCode.IN_PROGRESS:
        return 'bkgnd-orange';
      default:
        return 'bkgnd-black';
    }
  };

  const renderDetails = () => {
    if (loading) {
      return <span>loading......</span>;
    }
    if (!data) {
      return <span>No available data yet</span>;
    }

    const color = getStatusColor(data.status);

    return (
      <>
        <h1>{data.title}</h1>
        <div className='grid-container'>
          <div className='column'>
            <div className='item-box'>
              <p className='item-title'>Reported Date</p>
              <p>{data.dateTime}</p>
            </div>
            <div className='item-box'>
              <p className='item-title'>Description</p>
              <p>{data.description}</p>
            </div>
          </div>
          <div className='column'>
            <p className={`status ${color}`}>{data.status}</p>
            <div className='item-box'>
              <p className='item-title'>Venue</p>
              <p>{data.venue}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div className='details-wrapper'>{renderDetails()}</div>;
};

export default withRouter(DetailPage);
