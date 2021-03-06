import React, {useState, useEffect} from 'react';
import {Typography, Table, Button, Card, Skeleton} from 'antd';
import {withRouter} from 'react-router-dom';
import {loadSecureUrl} from 'helpers/api/main.api.helper';

const {Title} = Typography;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Fathers Name',
        dataIndex: 'fathers_name',
        key: 'fathers_name',
    }, {
        title: 'DOB',
        dataIndex: 'dob',
        key: 'dob',
    }, {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender'
    }, {
        title: 'State',
        dataIndex: 'state',
        key: 'state'
    }, {
        title: 'Education',
        dataIndex: 'educational_qualification',
        key: 'educational_qualification'
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            switch (status) {
                case 'A':
                    return 'Applied';
                case 'S':
                    return 'Seen';
                case 'R':
                    return 'Rejected';
                case 'D':
                    return 'Selected';
                case 'J':
                    return 'Joined';
                default:
                    return 'Unknown';
            }
        }
    }
];


const JobApplication = ({match}) => {
    const job_id = match.params.job_id;

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const x = async () => {
            setData(
                await loadSecureUrl(`/employer/jobs/${job_id}/`)
            );
            setLoading(false);
        };

        x();
    }, [setData, updating, job_id]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows.map((selected) => selected.id));
        }
    };

    const changeStatus = async (status) => {
        setUpdating(true);
        await loadSecureUrl(`employer/jobs/${job_id}/`, {
            method: 'POST',
            data: {
                seekers: selectedRow,
                status: status
            }
        });
        setUpdating(false);

    };

    return (
        <div className='container'>
            <Title>Job Application</Title>
            <Button.Group>
                <Button type='primary' onClick={() => changeStatus('D')}>
                    Select applicant
                </Button>
                <Button onClick={() => changeStatus('J')}>
                    Applicant Joined
                </Button>

                <Button onClick={() => changeStatus('R')} type='dashed'>
                    Reject applicant
                </Button>
                <Button onClick={() => changeStatus('B')} type='danger'>
                    Blacklist
                </Button>
            </Button.Group>
            <br/>
            <br/>
            {loading ? (
                    <Card>
                        <Skeleton/>
                    </Card>
                ) :
                <Table columns={columns} dataSource={data} rowSelection={rowSelection} expandedRowRender={seeker => (
                    <div>
                        {seeker.address}
                        <br/>
                        PinCode: {seeker.pin_code}
                        <br/>
                        <br/>
                    </div>
                )}/>
            }

        </div>
    )
};

export default withRouter(JobApplication);
