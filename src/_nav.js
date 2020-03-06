export default {
  items: [
    {
      name: "الصفحة الرئيسية",
      url: "/",
      icon: "fa fa-tachometer"
    },
    {
      name: "مقدمى الرعاية",
      url: "/Providers",
      icon: "fa fa-suitcase"
    },
    {
      name: "الأباء",
      url: "/parents",
      icon: "fa fa-users"
    },
    {
      name: "الأبناء",
      url: "/children",
      icon: "fa fa-child"
    },
    {
      name: "المدن",
      url: "/cities",
      icon: "fa fa-map-marker"
    },
    {
      name: "الإعدادات",
      icon: "fa fa-cogs",
      children: [
        {
          name: "الثوابت",
          url: "/settings/constants",
          icon: "fa fa-list-alt"
        },
        {
          name: "الحساب البنكي",
          url: "/settings/bankAccounts",
          icon: "fa fa-money"
        },
        {
          name: "شروط الخصوصية",
          url: "/settings/privacyPolicy",
          icon: "fa fa-exclamation-circle"
        },
        {
          name: "من نحن",
          url: "/settings/aboutUs",
          icon: "fa fa-question-circle-o"
        }
      ]
    },
    {
      name: "حسابى",
      url: "/myAccount",
      icon: "fa fa-user-circle-o"
    },
    {
      name: "تسجيل الخروج",
      url: "/logout",
      icon: "fa fa-sign-out"
    }
  ]
};
