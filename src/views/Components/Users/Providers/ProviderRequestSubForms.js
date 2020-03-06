import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Table, Badge } from 'reactstrap';
import RatingStars from "react-rating"
import ImgModal from "react-modal-image";
import GMap from "../../Custom/GMap/GMap";
import PopUp from "../../Custom/PopUp/PopUp";

let getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
},
    triggerValidatorStyle = (validator, father_go) => (
        validator == "send_one" ? { text: `تم ${father_go ? "الإرسال" : "الاستلام"} من ولى الأمر`, color: "warning" } :
            validator == "send_two" ? { text: "تم الإرسال من مقدم الرعاية", color: "warning" } :
                validator == "receive_one" ? { text: "تم التأكيد من مقدم الرعاية", color: "success" } :
                    validator == "receive_two" ? { text: "تم التأكيد من ولى الأمر", color: "success" } :
                        { text: "جديد", color: "info" }
    ),
    tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
    tdStyle = { width: "75%", textAlign: "right", }


export let DetailsForm = ({ request }) => {
    let stateColor = request.state
    stateColor =
        stateColor == "canceled" ? "danger" :
            stateColor == "new" ? "primary" :
                stateColor == "progress" ? "warning" :
                    stateColor == "accepted" ? "info" : "success";

    let gmapData = {
        color: "primary",
        buttonLabel: "عرض",
        body: <GMap lat={request.lat} lng={request.lang} zoom={11} />,
        footer: false,
        header: false,
        centered: true
    };


    let children = request.request_children.map(chld =>
        <Badge style={{
            fontSize: "13px", marginLeft: "10px",
            paddingLeft: "5px", paddingBottom: "6px",
        }} color="warning">
            {chld.request_children_child.name}
        </Badge>);

    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <div style={{ fontWeight: "500" }} >رقم الطلب {request.id}</div>
                        <div className="small text-muted">تاريخ الطلب {getDate(request.created_at)}</div>
                        <div className="small text-muted">تاريخ آخر تعديل {getDate(request.updated_at)}</div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table responsive borderless hover style={{ textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td style={tdHeadStyle}>الحالة</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={stateColor}>
                                        {request.state}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>إجمالى الساعات</td>
                                <td style={tdStyle}>{`${request.totalHours} ساعة`}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>إجمالى السعر</td>
                                <td style={tdStyle}>{request.totalCost}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>اسم ولى الأمر</td>
                                <td style={tdStyle}>
                                    <Link to={`/parents/${request.parent_id}`} >
                                        {request.request_parent.parent_user.name}
                                    </Link>
                                </td>
                            </tr>
                            {!request.father_go &&
                                <tr>
                                    <td style={tdHeadStyle}>استلام مقدم الرعاية للطفل (قيمة مضافة)</td>
                                    <td style={tdStyle}>
                                        <Badge style={{ fontSize: "15px" }} color={!request.father_go ? "success" : "info"}>
                                            {!request.father_go ? "نعم" : "لا"}
                                        </Badge>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td style={tdHeadStyle}>الأبناء المضافون لهذا الطلب</td>
                                <td style={tdStyle}><div style={{ display: "inline-flex" }}>{children}</div></td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>الموقع</td>
                                <td style={tdStyle}><PopUp {...gmapData} /></td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تفاصيل الموقع</td>
                                <td style={tdStyle}>{request.location_description}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}


let ListAppointmentFines = ({ fines, providerUserId }) => {
    return fines.map((fn, ind) => {
        let { fine_bocket_transactions: transaction } = fn
        return (
            <div key={ind}>
                <Card>
                    <CardHeader>
                        <div>
                            <div className="small text-muted">تاريخ الغرامة {getDate(transaction.created_at)}</div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table responsive borderless hover style={{ textAlign: "center" }}>
                            <tbody>
                                <tr>
                                    <td style={{ ...tdHeadStyle, width: "50%", }}>الغرامة مدفوعة من</td>
                                    <td style={tdStyle}>{transaction.user_id == providerUserId ? "مقدم الرعاية" : "ولي الأمر"}</td>
                                </tr>
                                <tr>
                                    <td style={{ ...tdHeadStyle, width: "50%", }}>المبلغ</td>
                                    <td style={tdStyle}>{transaction.amount}</td>
                                </tr>
                                {!transaction.description ? "" :
                                    <tr>
                                        <td style={{ ...tdHeadStyle, width: "50%", }}>الوصف</td>
                                        <td style={tdStyle}>{transaction.description}</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>)
    }
    )
}

let ListAppointmenLog = ({ log, father_go }) => {
    console.log(log);

    return log.map((lg, ind) => {
        let validatorStyle = triggerValidatorStyle(lg.status, father_go)
        return (
            <div key={ind}>
                <Card>
                    <CardBody>
                        <Table responsive borderless hover style={{ textAlign: "center" }}>
                            <tbody>
                                <tr>
                                    <td style={{ ...tdHeadStyle, width: "50%", }}>الحالة</td>
                                    <td style={tdStyle}>
                                        <Badge
                                            style={{ fontSize: "15px", fontWeight: "400", paddingBottom: "6px" }}
                                            color={validatorStyle.color}
                                        >
                                            {validatorStyle.text}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ ...tdHeadStyle, width: "50%", }}>تاريخ الحضور</td>
                                    <td style={tdStyle}>{getDate(lg.created_at)}</td>
                                </tr>
                                <tr>
                                    <td style={{ ...tdHeadStyle, width: "50%", }}>وقت الحضور</td>
                                    <td style={tdStyle}>{lg.created_at.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>)
    }
    )
}


export let AppointmentForm = ({ appointments, providerUserId, father_go }) => {

    return (
        <div>
            <Card>
                <CardBody>
                    <Table responsive hover style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">الحالة</th>
                                <th scope="col">اليوم</th>
                                <th scope="col">من</th>
                                <th scope="col">إلى</th>
                                <th scope="col">الحضور</th>
                                <th scope="col">الغرامات</th>
                                <th scope="col">تاريخ آخر تحديث</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((ap, ind) => {

                                let validatorStyle = triggerValidatorStyle(ap.trigger_validator, father_go),
                                    fines = ap.appointments,
                                    log = ap.appointment_log,
                                    fineData = {
                                        color: "primary",
                                        buttonLabel: "عرض",
                                        body: <ListAppointmentFines fines={fines} providerUserId={providerUserId} />,
                                        footer: false,
                                        // header: false,
                                        centered: false
                                    },
                                    logData = {
                                        color: "primary",
                                        buttonLabel: "عرض",
                                        body: <ListAppointmenLog log={log} father_go={father_go} />,
                                        footer: false,
                                        // header: false,
                                        centered: true
                                    };
                                console.log(log);

                                return (
                                    <tr key={ind}>
                                        <td>{ap.id}</td>
                                        <td>
                                            <Badge style={{ fontSize: "15px" }} color={validatorStyle.color}>
                                                {validatorStyle.text}
                                            </Badge>
                                        </td>
                                        <td>{ap.day_date}</td>
                                        <td>{ap.from}</td>
                                        <td>{ap.to}</td>
                                        <td>
                                            {log.length ? <PopUp {...logData} /> : <p>لا يوجد</p>}
                                        </td>
                                        <td>
                                            {fines.length ? <PopUp {...fineData} /> : <p>لا يوجد</p>}
                                        </td>
                                        <td>{getDate(ap.updated_at)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}

export let AllFines = ({ fines, providerUserId }) => {
    return (
        fines.map((fn, ind) => (
            <div key={ind}>
                <Card>
                    <CardHeader>
                        <div>
                            <div className="small text-muted">تاريخ الغرامة {getDate(fn.created_at)}</div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table responsive borderless hover style={{ textAlign: "center" }}>
                            <tbody>
                                <tr>
                                    <td style={tdHeadStyle}>رقم الموعد</td>
                                    <td style={tdStyle}>{fn.app_id}</td>
                                </tr>
                                <tr>
                                    <td style={tdHeadStyle}>الغرامة مدفوعة من</td>
                                    <td style={tdStyle}>{fn.user_id == providerUserId ? "مقدم الرعاية" : "ولي الأمر"}</td>
                                </tr>
                                <tr>
                                    <td style={tdHeadStyle}>المبلغ</td>
                                    <td style={tdStyle}>{fn.amount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        ))
    )
}

export let ReviewsForm = ({ reviews }) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <Table responsive borderless hover style={{ textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td style={tdHeadStyle}>تقييم ولى الأمر</td>
                                <td style={tdStyle}>
                                    <RatingStars
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        fractions={1}
                                        initialRating={reviews.rate}
                                        direction={"rtl"}
                                        readonly={true}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تقييم الطفل</td>
                                <td style={tdStyle}>
                                    <RatingStars
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        fractions={1}
                                        initialRating={reviews.kid_reaction}
                                        direction={"rtl"}
                                        readonly={true}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>التقييم الإيجابى</td>
                                <td style={tdStyle}>{reviews.positive_review}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>التقييم السلبي</td>
                                <td style={tdStyle}>{reviews.negative_review}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}

export let ChatForm = ({ chat }) => {
    return (
        <div>
            {
                chat.map((cht, ind) => (
                    <Card key={ind} style={{ marginTop: "5px" }}>
                        <CardBody>
                            <Table responsive borderless hover style={{ textAlign: "center" }}>
                                <tbody>
                                    <tr>
                                        <td style={tdHeadStyle}>المرسل</td>
                                        <td style={tdStyle}><b>{cht.sender}</b></td>
                                    </tr>
                                    {cht.image &&<tr>
                                        <td style={tdHeadStyle}>صورة</td>
                                        
                                            <td style={tdStyle}>
                                                <div style={{ maxWidth: "55px" }}>
                                                    <ImgModal
                                                        small={cht.image}
                                                        large={cht.image}
                                                        alt="الصورة"
                                                    />
                                                </div>
                                            </td>
                                    </tr>}
                                    <tr>
                                        <td style={tdHeadStyle}>الرسالة</td>
                                        {cht.message && <td style={tdStyle}>{cht.message}</td>}
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <div>
                                <div className="small text-muted">تاريخ الرسالة {getDate(cht.created_at)}</div>
                                <div className="small text-muted">تاريخ آخر تعديل {getDate(cht.updated_at)}</div>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}