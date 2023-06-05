import { Card, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

function Convter() {
  // const arr=[
  //     { value: 'jack', label: 'Jack' },
  //     { value: 'lucy', label: 'Lucy' },
  //     { value: 'Yiminghe', label: 'yiminghe' },
  //     { value: 'disabled', label: 'Disabled', disabled: true },
  //   ]
  const [data, setdata] = useState([]);
  const [inv, setinv] = useState("1");
  const [fid, setfid] = useState("Bitcoin");
  const [sed, setsed] = useState("Ether");
  const [sh, setsh] = useState(1/13);
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    //  alert(`you change ${inv} ${fid} ${sed}` )
    if (data.length === 0) return;

    const fir = data.find((item) => {
      return item.value === fid;
    }).money;
    const ser = data.find((item) => {
      return item.value === sed;
    }).money;
    const re = (inv * ser) / fir;
    setsh(re);
   
  }, [inv, fid, sed]);
  async function fetchdata() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/exchange_rates"
      );
      const api = await res.json();
      const apidata = Object.entries(api.rates);
      let q = [];
      q =
        apidata &&
        apidata.map((item, i) => {
          return {
            value: item[1].name,
            label: item[1].name,
            money: item[1].value,
          };
        });
      setdata(q);
    } catch (error) {
      console.log("errer");
    }
  }
  return (
    <div className="convert">
      <Card className="card" title={"vipin"}>
        <Form>
          <Form.Item>
            <Input
              defaultValue={1}
              onChange={(e) => {
                setinv(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <div className="inputd">
          <Select
            onSelect={(v) => setfid(v)}
            style={{ width: 120 }}
            defaultValue="Bitcoin"
            options={data}
          />
          <Select
            onSelect={(v) => setsed(v)}
            style={{ width: 120 }}
            defaultValue="Ether"
            options={data}
          />
        </div>
        <h1>{sh}</h1>
      </Card>
    </div>
  );
}

export default Convter;
