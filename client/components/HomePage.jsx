import React from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TimelineIcon from '@material-ui/icons/Timeline';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CreateIcon from '@material-ui/icons/Create';
const HomePage = () => {
  return (
    <>
      <div className='home'>
        <Link to='/logs' className='link'>
          <div className='card'>
            <div className='card__side card__side--front'>
              <div className='card__picture card__picture--2'>&nbsp;</div>
              <h4 className='card__heading'>
                <span className='card__heading-span card__heading-span--2'>
                  View Logs
                </span>
              </h4>
              <div className='card__picture card__picture--2'>
                <VisibilityIcon style={{ fontSize: 80 }} />
              </div>
              <div className='card__details'>
                <ul>
                  <li>View and filter log data from a cluster</li>
                </ul>
              </div>
            </div>
          </div>
        </Link>

        <Link to='/visualizer' className='link'>
          <div className='card'>
            <div className='card__side card__side--front'>
              <div className='card__picture card__picture--2'>&nbsp;</div>
              <h4 className='card__heading'>
                <span className='card__heading-span card__heading-span--2'>
                  Visualize Logs
                </span>
              </h4>
              <div className='card__picture card__picture--2'>
                <TimelineIcon style={{ fontSize: 80 }} />
              </div>
              <div className='card__details'>
                <ul>
                  <li>
                    View recent log counts per hour
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Link>

        <Link to='/alertsManager' className='link'>
          <div className='card'>
            <div className='card__side card__side--front'>
              <div className='card__picture card__picture--2'>&nbsp;</div>
              <h4 className='card__heading'>
                <span className='card__heading-span card__heading-span--2'>
                  Manage Alerts
                </span>
              </h4>
              <div className='card__picture card__picture--2'>
                <AnnouncementIcon style={{ fontSize: 80 }} />
              </div>
              <div className='card__details'>
                <ul>
                  <li>Create alerts and configure custom notification actions</li>
                </ul>
              </div>
            </div>
          </div>
        </Link>

        <Link to='/indices' className='link'>
          <div className='card'>
            <div className='card__side card__side--front'>
              <div className='card__picture card__picture--2'>&nbsp;</div>
              <h4 className='card__heading'>
                <span className='card__heading-span card__heading-span--2'>
                  Create An Index
                </span>
              </h4>
              <div className='card__picture card__picture--2'>
                <CreateIcon style={{ fontSize: 80 }} />
              </div>
              <div className='card__details'>
                <ul>
                  <li>Create and delete index patterns for searching your Elasticsearch cluster</li>
                </ul>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
