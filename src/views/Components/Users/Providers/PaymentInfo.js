import React, { Component } from 'react';
import { Card, CardBody, Table,} from 'reactstrap';

let tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
    tdStyle = { width: "75%", textAlign: "right", }


export default ({ paymentInfo }) => {

    return (
        <div>
            <Card>
                <CardBody>
                    <Table style={{ textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td style={tdHeadStyle}>اسم المالك</td>
                                <td style={tdStyle}>{paymentInfo.holder_name}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>رقم البطاقة</td>
                                <td style={tdStyle}>{paymentInfo.card_number}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>رمز التحقق</td>
                                <td style={tdStyle}>{paymentInfo.cvc}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تاريخ الانتهاء</td>
                                <td style={tdStyle}>{paymentInfo.year}/{paymentInfo.month}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}