import styled from "@emotion/styled";
import SidebarPortal from "../components/SidebarPortal";
import { useState, useMemo, useEffect, useRef } from "react";

import Table from "../components/Table";
import DATA from "../data.json";
import useRenderCount from "../hooks/useRenderCount";

const P = styled.p`
  margin: 1rem;
`;

const ProPage = () => {
  // const [data, setData] = useState(DATA.slice(0, 20));

  const [data, setData] = useState(DATA);
  const column = useMemo(
    () => [
      {
        key: "country",
        label: "Country",
        width: 100,
      },
      { key: "team", label: "Team", width: 100 },
      { key: "name", label: "Name", width: 100 },
      {
        key: "scopeSensitivity",
        label: "Scope Sensitivity",
        width: 70,
        abbr: "Scope",
        format: (data: number) => data.toFixed(2),
      },
      {
        key: "mouseSensitivity",
        label: "In Game Sensitivity",
        width: 70,
        abbr: "Sens.",
        format: (data: number) => data.toFixed(2),
      },
      { key: "dpi", label: "DPI", width: 60 },

      {
        key: "edpi",
        label: "eDPI",
        width: 60,
        format: (data: number) => Math.round(data),
      },
      { key: "gpu", label: "GPU", width: 120 },
      { key: "headset", label: "Headset" },
      { key: "keyboard", label: "Keyboard" },
      { key: "monitor", label: "Monitor" },
      {
        key: "monitorRefreshRate",
        label: "Monitor Refresh Rate",
        width: 70,
        abbr: "Hz",
      },
      { key: "mouse", label: "Mouse" },
      {
        key: "mousePollingRate",
        label: "Mouse Polling Rate",
        width: 80,

        abbr: "Poll Rate",
      },
      { key: "mousepad", label: "Mousepad" },
      { key: "resolution", label: "Resolution", width: 100 },
    ],
    []
  );

  const renderCount = useRenderCount();

  useEffect(() => {
    console.log("ProPage.tsx: data");
  }, [data]);

  useEffect(() => {
    console.log("ProPage.tsx: column");
  }, [column]);

  useEffect(() => {
    console.log("ProPage.tsx rendered", renderCount);
  });

  return (
    <>
      <SidebarPortal>
        <P>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
          delectus, eligendi earum, sed dicta ut iste eos dolorem aspernatur
          alias reprehenderit adipisci placeat labore unde molestiae consequatur
          excepturi asperiores officia temporibus voluptatem esse animi atque
          impedit? Ab numquam quasi architecto, atque sequi praesentium
          voluptatibus quisquam nisi, fugit commodi, similique aspernatur?
        </P>

        <P>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
          delectus, eligendi earum, sed dicta ut iste eos dolorem aspernatur
          alias reprehenderit adipisci placeat labore unde molestiae consequatur
          excepturi asperiores officia temporibus voluptatem esse animi atque
          impedit? Ab numquam quasi architecto, atque sequi praesentium
          voluptatibus quisquam nisi, fugit commodi, similique aspernatur?
        </P>
      </SidebarPortal>
      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
        delectus, eligendi earum, sed dicta ut iste eos dolorem aspernatur alias
        reprehenderit adipisci placeat labore unde molestiae consequatur
        excepturi asperiores officia temporibus voluptatem esse animi atque
        impedit? Ab numquam quasi architecto, atque sequi praesentium
        voluptatibus quisquam nisi, fugit commodi, similique aspernatur?
      </P>
      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
        eligendi, dolor, sit velit tempora asperiores numquam iusto, omnis quam
        laborum soluta! Nobis laudantium dolor consequatur eveniet molestias
        sapiente similique cum ut maxime maiores beatae mollitia aliquid iure
        officiis labore error repudiandae, repellat alias perspiciatis provident
        sequi voluptas. Doloremque illo id iste, a quisquam voluptates, odio
        alias provident exercitationem nihil rerum. Inventore laborum est harum,
        nam, iusto qui cupiditate rem at quasi recusandae sit accusamus in.
        Cupiditate voluptatibus incidunt aspernatur nobis reiciendis eaque
        corrupti adipisci quaerat. Dolorem, architecto. Nulla quaerat aliquam
        architecto autem repellendus, ea a est exercitationem dolores
        perspiciatis possimus?
      </P>

      <Table data={data} column={column} />
    </>
  );
};

export default ProPage;
