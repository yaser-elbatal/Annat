import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Table, Badge } from 'reactstrap';
import RatingStars from "react-rating"
import ImgModal from "react-modal-image"
import GMap from "../../Custom/GMap/GMap"
import PopUp from "../../Custom/PopUp/PopUp"
import ToolTip from "../../Custom/ToolTip/ToolTip";

let getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

export default ({ provider }) => {
    let provider_user = provider.provider_user,
        provider_area = provider.provider_area,
        provider_reviews__avg = !provider.provider_reviews.length ? 0 :
            provider.provider_reviews.reduce((tot, rev) => tot + rev.kid_reaction, 0) / provider.provider_reviews.length,
        tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
        tdStyle = { width: "75%", textAlign: "right", },
        hostling_images = provider.hostling_images

    provider.updated_at = new Date(provider.updated_at) > new Date(provider_user.updated_at) ?
        provider.updated_at : provider_user.updated_at;

    let imgModalFunc = (link, label) => (
        <div style={{ width: "65px", margin: "0px 0px 7px 7px" }}>
            <ImgModal
                small={link}
                large={link}
                alt={label || undefined}
            />
        </div>);

    hostling_images = hostling_images.split(',').map(img => {
        return imgModalFunc(img, "صورة لمكان الاستضافة");
    })


    let gmapData = {
        color: "primary",
        buttonLabel: "عرض",
        body: <GMap lat={provider.lat} lng={provider.lang} zoom={11} />,
        footer: false,
        header: false,
        centered: true
    }


    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <ToolTip
                            containerBodyElmStyle={{borderRadius: "50%"}}
                            clickableElm={                            
                                <div className="avatar">
                                    <img src={provider.provider_user.avatar} style={{ width: "36px", height: "36px" }} className="img-avatar" />
                                    <span className={`avatar-status badge-${provider.provider_user.isActivated ? "primary" : "danger"}`}></span>
                                </div>
                            }
                            
                            bodyElm={
                                    <img src={provider.provider_user.avatar} style={{ width: "200px", height: "200px" }} className="img-avatar" />
                            }

                        />
                        <div style={{ fontWeight: "500", position: "absolute", top: "9px", right: "65px" }} >
                            {provider.provider_user.name}
                        </div>
                        <div style={{ position: "absolute", top: "31px", right: "62px", fontSize: "11px" }}>
                            <div className="small text-muted">
                                {/* <RatingStars
                  count={5}
                  value={provider_reviews__avg}
                  edit={false}
                  emptyIcon={<i className="fa fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  filledIcon={<i className="fa fa-star" />}
                /> */}
                                <RatingStars
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    fractions={1}
                                    initialRating={provider_reviews__avg}
                                    direction={"rtl"}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table responsive striped hover style={{ textAlign: "center" }}>
                        <tbody>
                            <tr>
                                <td style={tdHeadStyle}>البريد الإلكترونى</td>
                                <td style={tdStyle}>{provider_user.email}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>رقم الجوال</td>
                                <td style={tdStyle}>{provider_user.phone}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تاريخ التسجيل</td>
                                <td style={tdStyle}>{getDate(provider.created_at)}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تاريخ آخر تحديث</td>
                                <td style={tdStyle}>{getDate(provider.updated_at)}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>التفعيل</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={provider_user.isActivated ? "success" : "warning"}>
                                        {provider_user.isActivated ? "مفعل" : "غير مفعل"}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>استكمال البيانات</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={provider_user.isCompleted ? "success" : "warning"}>
                                        {provider_user.isCompleted ? "تم" : "لم يتم"}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>بيان الشخصية</td>
                                <td style={tdStyle}>{imgModalFunc(provider_user.identity_image, "بيان الشخصية")}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>المكان</td>
                                <td style={tdStyle}>{`${provider_area.name} / ${provider_area.area_city.name}`}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>الموقع</td>
                                <td style={tdStyle}><PopUp {...gmapData} /></td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>تفاصيل الموقع</td>
                                <td style={tdStyle}>{provider.location_description}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>عدد سنوات الخبرة</td>
                                <td style={tdStyle}>{provider.experience}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>الذهاب لبيت الطفل</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={provider.go_to_client ? "success" : "warning"}>
                                        {provider.go_to_client ? "نعم" : "لا"}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>الاستضافة فى المنزل</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={provider.receive_in_home ? "success" : "warning"}>
                                        {provider.receive_in_home ? "نعم" : "لا"}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>صور لمكان الاستضافة</td>
                                <td style={tdStyle}><div style={{ display: "flex", flexWrap: "wrap" }}>{hostling_images}</div></td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>سعر الساعة</td>
                                <td style={tdStyle}>{provider.hour_price}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>عاملة</td>
                                <td style={tdStyle}>
                                    <Badge style={{ fontSize: "15px" }} color={provider.isWorking ? "success" : "warning"}>
                                        {provider.isWorking ? "نعم" : "لا"}
                                    </Badge>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>عمر الطفل</td>
                                <td style={tdStyle}>{`تقبل من عمر ${provider.minAge} إلى عمر ${provider.maxAge} سنوات`}</td>
                            </tr>
                            <tr>
                                <td style={tdHeadStyle}>أقصى عدد الأطفال</td>
                                <td style={tdStyle}>{provider.maxCount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}