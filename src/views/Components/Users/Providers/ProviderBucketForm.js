import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Table, Badge } from 'reactstrap';


export default ({ bucket }) => {

    let getDate = (isoDate) => {
        let date = new Date(isoDate).toLocaleString()
        date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
        date = date[1] + "/" + date[0] + "/" + date[2]

        return date;
    },
        actonMean = (action) => (
            action == "withdraw" ? "سحب من المحفظة" :
                action == "withdraw_fine" ? "دفع غرامة" :
                    action == "withdraw_request" ? "دفع ثمن الطلب" :
                        action == "withdraw_app" ? "خصم نسبة التطبيق" :
                            action == "deposite_fine" ? "استقبال بدل غرامة" :
                                action == "deposite_request" ? "استقبال ثمن طلب" :
                                    action == "deposite_admin" ? "إيداع فى المحفظة" :
                                        "عملية غير معرفة"
        ),
        trs = bucket.map((buc, ind) => {

            return (
                <tr key={ind}>
                    <td><b>{ind + 1}</b></td>
                    <td><b>{actonMean(buc.action)}</b></td>
                    <td>{buc.amount}</td>
                    <td>{getDate(buc.created_at)}</td>
                </tr>
            )
        }),
        toke = bucket.reduce((acc, buc) => buc.action.includes("deposite") ? buc.amount + acc : 0, 0),
        gave = bucket.reduce((acc, buc) => buc.action.includes("withdraw") ? buc.amount + acc : 0, 0);

    return (
        <div>
            <div style={{ fontWeight: "500", margin: "15px", display: "grid" }}>
                <span>{`ما تم دفعه لمقدم الرعاية : ${toke}`}</span>
                <span>{`ما تم سحبه من مقدم الرعاية : ${gave}`}</span>
            </div>
            <Card>
                <CardBody>
                    <Table responsive striped hover style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">العملية</th>
                                <th scope="col">المبلغ</th>
                                <th scope="col">تاريخ العملية</th>
                            </tr>
                        </thead>
                        <tbody>{trs}</tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
