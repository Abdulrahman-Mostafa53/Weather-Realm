import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { Home, getWeather } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  console.log(window.innerWidth, "width", document.documentElement.clientWidth);
  if (!localStorage.getItem("locations"))
    localStorage.setItem(
      "locations",
      JSON.stringify([
        {
          id: "31.2017629.91582",
          countryCode: "Eg",
          name: "Alexandria",
          lat: "31.20176",
          lon: "29.91582",
          timezone: "Africa/Cairo",
        },
      ])
    );
  if (!localStorage.getItem("current")) {
    localStorage.setItem(
      "current",
      JSON.stringify({
        id: "31.2017629.91582",
        countryCode: "Eg",
        name: "Alexandria",
        lat: "31.20176",
        lon: "29.91582",
        timezone: "Africa/Cairo",
      })
    );
  }
  if (localStorage.getItem("timeunit") === null) {
    localStorage.setItem("timeunit", 1);
  }
  if (!localStorage.getItem("tempunit")) {
    localStorage.setItem("tempunit", JSON.stringify("C"));
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route exact index element={<Home />} loader={getWeather} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
