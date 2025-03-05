import Protected from "./Protected/Protected";
import Layout from "../Layout/Admin/index";
import Index from "../Pages/Admin/Index";
import AddTestimonials from "../Components/Admin/Testimonials/AddTestimonials";
import AddMenu from "../Components/Admin/Menu/Add-Menu";
import Testimonials from "../Components/Admin/Testimonials/Testimonials";
import NotFound from "../Components/Other/404";
import ViewMenu from "../Components/Admin/Menu/View-Menu";

const AdminRoute = [{
    element: <Protected />,
    errorElement: <NotFound />,
    children: [
        {
            element: <Layout />,
            children: [
                {
                    path: "/admin",
                    element: <Index />
                },
                {
                    path: "/admin/testimonials",
                    element: <Testimonials />
                },
                {
                    path: "/admin/add-testimonials/:id?",
                    element: <AddTestimonials />
                },
                {
                    path: "/admin/add-menu/:id?",
                    element: <AddMenu />
                },
                {
                    path: "/admin/view-menu/:id?",
                    element: < ViewMenu/>
                }
            ]
        }
    ]
}];

export default AdminRoute;