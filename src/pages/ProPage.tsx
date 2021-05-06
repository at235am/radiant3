import styled from "@emotion/styled";
import SidebarPortal from "../components/SidebarPortal";
import { useState } from "react";

import Table from "../components/Table";

import DATA from "../data.json";

const P = styled.p`
  margin: 1rem;
`;

const ProPage = () => {
  const [data, setData] = useState<object[]>(DATA);

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

      <Table
        data={data}
        column={[
          { key: "country", label: "Country", format: (v) => v.toLowerCase() },
          { key: "team", label: "Team" },
          { key: "name", label: "Name" },
          { key: "scopeSensitivity", label: "Scope Sensitivity" },
          { key: "mouseSensitivity", label: "In Game Sensitivity" },
          { key: "dpi", label: "DPI" },
          { key: "edpi", label: "eDPI" },
          { key: "gpu", label: "GPU" },
          { key: "headset", label: "Headset" },
          { key: "keyboard", label: "Keyboard" },
          { key: "monitor", label: "Monitor" },
          { key: "monitorRefreshRate", label: "Monitor Refresh Rate" },
          { key: "mouse", label: "Mouse" },
          { key: "mousePollingRate", label: "Mouse Polling Rate" },
          { key: "mousepad", label: "Mousepad" },
          { key: "resolution", label: "Resolution" },
        ]}
      />
    </>
  );
};

export default ProPage;
