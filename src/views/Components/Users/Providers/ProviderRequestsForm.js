import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import { Subscription } from 'react-apollo';
import { List_Provider_Requests } from '../../../../services/queries/Providers';
import Accordion from "../../Custom/Accordion/Accordion";
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import Tabs from '../../Custom/Tabs/Tabs';
import { AppointmentForm, AllFines, ChatForm, DetailsForm, ReviewsForm } from './ProviderRequestSubForms';


export default ({ providerId }) => {
    return (
        <div>
            <Subscription subscription={List_Provider_Requests} variables={{ provider_id: providerId }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return (<Loader />);
                        if (error) return (<Error />);

                        if (data.request.length) {
                            let requestsAccordionArray = data.request.map((req, ind) => {
                                let stateColor = req.state
                                stateColor =
                                    stateColor == "canceled" ? "danger" :
                                        stateColor == "new" ? "primary" :
                                            stateColor == "progress" ? "warning" :
                                                stateColor == "complete" ? "dark" :
                                                    stateColor == "accepted" ? "info" : "success";

                                let allFines = [];
                                req.request_appointments.map(apps => {
                                    apps.appointments.map(app => {
                                        if (app.fine_bocket_transactions) {
                                            if (app.description) {
                                                app.fine_bocket_transactions.description = app.description;
                                                app.fine_bocket_transactions.app_id = apps.id;
                                            }
                                            allFines.push(app.fine_bocket_transactions)
                                        }
                                    })
                                });



                                let DetailsTab = <DetailsForm request={req} />,
                                    AppointmentTab = !req.request_appointments.length ? <NoResults /> : <AppointmentForm appointments={req.request_appointments} father_go={req.father_go} providerUserId={req.request_provider.provider_user.id} />,
                                    ReviewsTab = req.request_provider_reviews && !req.request_provider_reviews.length ? <ReviewsForm reviews={req.request_provider_reviews} /> : <NoResults />,
                                    ChatTab = !req.request_chat.length ? <NoResults /> : <ChatForm chat={req.request_chat} />,
                                    FinesTab = !allFines.length ? <NoResults /> : <AllFines fines={allFines} providerUserId={req.request_provider.provider_user.id} />;

                                let dataTabs = [
                                    {
                                        label: <b>البيانات الرئيسية</b>,
                                        body: DetailsTab
                                    },
                                    {
                                        label: <b>المواعيد</b>,
                                        body: AppointmentTab
                                    },
                                    {
                                        label: <b>التقييم</b>,
                                        body: ReviewsTab
                                    },
                                    {
                                        label: <b>المحادثة</b>,
                                        body: ChatTab
                                    },
                                    {
                                        label: <b>الغرامات</b>,
                                        body: FinesTab
                                    },
                                ]

                                let requestTab = (<Tabs bodyStyle={{ backgroundColor: "#e3d2d2" }} data={dataTabs} />);

                                let accordionBody = requestTab;

                                return {
                                    title:
                                        <div>
                                            <b>{`الطلب رقم (${req.id})`}</b>
                                            <b> -> {ind + 1}</b>
                                            <Badge style={{ fontSize: "15px", left: "80px", position: "absolute" }} color={stateColor}>
                                                {req.state}
                                            </Badge>
                                        </div>

                                    ,
                                    body: accordionBody
                                };
                            })

                            return (<Accordion rightTitle={true} data={requestsAccordionArray} />)
                        }
                        else {
                            return <NoResults />
                        }
                    }
                }
            </Subscription>
        </div>
    )
}