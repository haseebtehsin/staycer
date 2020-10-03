import React, { Component } from "react";
import { ResponsivePie } from "@nivo/pie";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
import NotFound from "../../common/NotFound";

class TradeCount extends Component {
  constructor(props) {
    super(props);
    this.untilDate = new Date();
    const defaultDateMonthOffset = 1;
    this.untilDate.setMonth(this.untilDate.getMonth() + defaultDateMonthOffset);
    this.untilDate = this.untilDate.toLocaleDateString("fr-CA");
    this.state = {
      tradesCountData: [],
    };
  }

  fetchTradeCountData = async () => {
    let endpoint = new URL(apiEndPoints.metricsTradesCountResource());
    endpoint.searchParams.append("date_until", this.untilDate);
    const response = await http.get(endpoint.toString());

    if (response.status === 200) {
      this.setState({
        tradesCountData: response.data.map((trade_count) => ({
          id: trade_count[0],
          label: trade_count[0],
          value: trade_count[1],
        })),
      });
      console.log("got trade count data");
    }
  };

  componentDidMount() {
    this.fetchTradeCountData();
  }

  handleDateChange = (e) => {
    this.untilDate = e.target.value;
    this.fetchTradeCountData();
  };

  //   const data = [
  //     {
  //       id: "hack",
  //       label: "hack",
  //       value: 317,
  //       //   color: "hsl(20, 70%, 50%)",
  //     },
  //     {
  //       id: "lisp",
  //       label: "lisp",
  //       value: 585,
  //       //   color: "hsl(103, 70%, 50%)",
  //     },
  //     {
  //       id: "scala",
  //       label: "scala",
  //       value: 427,
  //       //   color: "hsl(36, 70%, 50%)",
  //     },
  //     {
  //       id: "go",
  //       label: "go",
  //       value: 450,
  //       //   color: "hsl(60, 70%, 50%)",
  //     },
  //     {
  //       id: "make",
  //       label: "make",
  //       value: 268,
  //       //   color: "hsl(34, 70%, 50%)",
  //     },
  //   ];

  renderDateSelector = () => {
    return (
      <div className="form-inline">
        <div className="form-group ">
          <label htmlFor="untilDate" className="mr-2">
            Until
          </label>
          <input
            type="date"
            id="untilDate"
            className="form-control"
            onChange={(e, data) => {
              this.handleDateChange(e);
            }}
            defaultValue={this.untilDate}
          ></input>
        </div>
      </div>
    );
  };

  tradesCountDataEmpty = () => {
    const { tradesCountData } = this.state;
    if (tradesCountData.length === 0) return true;
    let isEmpty = true;
    tradesCountData.forEach((tradeCount) => {
      if (tradeCount.value > 0) isEmpty = false;
    });
    return isEmpty;
  };

  render() {
    const { tradesCountData } = this.state;
    return (
      <React.Fragment>
        <h3>Available Trade Personal</h3>
        <div style={{ width: "100%" }}>{this.renderDateSelector()}</div>
        <div style={{ height: "300px", width: "300px" }}>
          {!this.tradesCountDataEmpty() ? (
            <ResponsivePie
              data={tradesCountData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "pastel1" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: "color" }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              // defs={[
              //   {
              //     id: "dots",
              //     type: "patternDots",
              //     background: "inherit",
              //     color: "rgba(255, 255, 255, 0.3)",
              //     size: 4,
              //     padding: 1,
              //     stagger: true,
              //   },
              //   {
              //     id: "lines",
              //     type: "patternLines",
              //     background: "inherit",
              //     color: "rgba(255, 255, 255, 0.3)",
              //     rotation: -45,
              //     lineWidth: 6,
              //     spacing: 10,
              //   },
              // ]}
              //   fill={[
              //     {
              //       match: {
              //         id: "ruby",
              //       },
              //       id: "dots",
              //     },
              //     {
              //       match: {
              //         id: "c",
              //       },
              //       id: "dots",
              //     },
              //     {
              //       match: {
              //         id: "go",
              //       },
              //       id: "dots",
              //     },
              //     {
              //       match: {
              //         id: "python",
              //       },
              //       id: "dots",
              //     },
              //     {
              //       match: {
              //         id: "scala",
              //       },
              //       id: "lines",
              //     },
              //     {
              //       match: {
              //         id: "lisp",
              //       },
              //       id: "lines",
              //     },
              //     {
              //       match: {
              //         id: "elixir",
              //       },
              //       id: "lines",
              //     },
              //     {
              //       match: {
              //         id: "javascript",
              //       },
              //       id: "lines",
              //     },
              //   ]}
              //   legends={[
              //     {
              //       anchor: "bottom",
              //       direction: "row",
              //       translateY: 56,
              //       itemWidth: 100,
              //       itemHeight: 18,
              //       itemTextColor: "#999",
              //       symbolSize: 18,
              //       symbolShape: "circle",
              //       effects: [
              //         {
              //           on: "hover",
              //           style: {
              //             itemTextColor: "#000",
              //           },
              //         },
              //       ],
              //     },
              //   ]}
            />
          ) : (
            <NotFound />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TradeCount;
