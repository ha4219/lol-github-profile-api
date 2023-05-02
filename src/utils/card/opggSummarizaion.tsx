import { OpggSummarization1Type } from '@/types/res';
import styled from '@emotion/styled';
import { getChampionImg } from '../championImgLoader';
import Image from 'next/image';

const Container = styled.g`
  font-family: Roboto, sans-serif;
  fill: #9e9eb1;
  font-size: 12px;
  line-height: 16px;
  text-anchor: start;
  alignment-baseline: baseline;
  & rect {
    fill: #31313c;
  }
  & circle {
    stroke
  }

  & .ratio-text {
    font-weight: bold;
    font-size: 14px;
  }

  & .info-box {
    & .kda {
      line-height: 26px;
      font-size:20px;
      font-weight: bold;
      fill: #FFF;
    }
  }

  & .champions-sort {
    & image {
      clip-path: inset(0% round 15px);
    }
    & .li {
      fill: white;
    }
  }

  & .position-box {
    color: #9e9eb1;
    & .position-box-title {
      line-height: 16px;
      font-size: 12px;
      text-align: center;
    }
    & ul {
      display: flex;
      justify-content: space-around;
      margin-top: 12px;
      list-style: none;

      & .bar {
        display: flex;
        align-items: flex-end;
        width: 16px;
        height: 64px;
        background-color: #424254;
      }
      & .gauge {
        width: 16px;
        background-color: #5383E8;
      }

      & .position {
        margin-top: 8px;

      }
    }
  }
`;

export function OpggSummarizatoinCard({
  wins,
  losses,
  ...a
}: OpggSummarization1Type) {
  const all = wins + losses;
  const ratio = wins / all;
  const length = 80 * Math.PI;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="740"
      height="164"
      viewBox="0 0 740 164"
    >
      <Container>
        <rect x1={0} y1={0} width={740} height={164} rx={5} ry={5} />
        <text x={21} y={36}>
          {wins + losses}G {wins}W {losses}L
        </text>
        <circle
          cx={65}
          cy={96}
          r={40}
          stroke="rgb(232, 64, 87)"
          strokeWidth={14}
          fill="transparent"
        />
        <circle
          cx={65}
          cy={96}
          r={40}
          stroke="#5383E8"
          strokeWidth={14}
          fill="transparent"
          strokeDashoffset={(1 - ratio) * length}
          strokeDasharray={length}
          transform="rotate(-90, 65, 96)"
        />
        <text
          x={65}
          y={96}
          className="ratio-text"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={ratio >= 0.5 ? '#5383E8' : 'rgb(232, 64, 87)'}
        >
          {Math.round(ratio * 100)}%
        </text>
        <g className="info-box">
          <text x={141} y={80} textAnchor="start" alignmentBaseline="baseline">
            {`${(a.kills / all).toFixed(1)} / ${(a.deaths / all).toFixed(
              1,
            )} / ${(a.assists / all).toFixed(1)}`}
          </text>
          <text
            x={141}
            y={106}
            className="kda"
            textAnchor="start"
            alignmentBaseline="baseline"
          >{`${((a.kills + a.assists) / a.deaths).toFixed(2)}:1`}</text>
        </g>
        <g className="champions-sort">
          <text x={259} y={36}>
            Recent 20 Games Played Champions
          </text>
          <image
            x={259}
            y={48}
            href={getChampionImg(a.champions[0].name)}
            width={24}
            height={24}
          />

          <image
            x={259}
            y={80}
            href={getChampionImg(a.champions[1].name)}
            width={24}
            height={24}
          />
          <text
            x={289}
            y={64}
            className="li"
            textAnchor="start"
            alignmentBaseline="baseline"
            width={222}
            height={24}
          >
            {Math.round(
              (a.champions[0].wins /
                (a.champions[0].wins + a.champions[0].losses)) *
                100,
            )}
            %{` (${a.champions[0].wins}W ${a.champions[0].losses}L)`}
            {` ${(
              (a.champions[0].kills + a.champions[0].assits) /
              a.champions[0].deaths
            ).toFixed(2)} KDA`}
          </text>
          <text
            x={289}
            y={97}
            className="li"
            textAnchor="start"
            alignmentBaseline="baseline"
            width={222}
            height={24}
          >
            {Math.round(
              (a.champions[1].wins /
                (a.champions[1].wins + a.champions[1].losses)) *
                100,
            )}
            %{` (${a.champions[1].wins}W ${a.champions[1].losses}L)`}
            {` ${(
              (a.champions[1].kills + a.champions[1].assits) /
              a.champions[1].deaths
            ).toFixed(2)} KDA`}
          </text>
          <image
            x={259}
            y={112}
            href={getChampionImg(a.champions[2].name)}
            width={24}
            height={24}
          />
          <text
            x={289}
            y={127}
            className="li"
            textAnchor="start"
            alignmentBaseline="baseline"
            width={222}
            height={24}
          >
            {Math.round(
              (a.champions[2].wins /
                (a.champions[2].wins + a.champions[2].losses)) *
                100,
            )}
            %{` (${a.champions[2].wins}W ${a.champions[2].losses}L)`}
            {` ${(
              (a.champions[2].kills + a.champions[2].assits) /
              a.champions[2].deaths
            ).toFixed(2)} KDA`}
          </text>
        </g>

        <g
          className="position-box"
          x={497}
          y={24}
          width={222}
          height={116}
          viewBox="0 0 222 116"
        >
          <text className="position-box-title" x={540} y={36}>
            Preferred Position (Rank)
          </text>
          <line
            x1={519}
            x2={519}
            y1={116}
            y2={52}
            stroke="#424254"
            strokeWidth={16}
          />
          <line
            x1={519}
            x2={519}
            y1={116}
            y2={116 - 64 * (a.roles[0] / all)}
            stroke="#5383E8"
            strokeWidth={16}
          />
          <image
            x={511}
            y={124}
            width={16}
            height={16}
            href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzlBQTRBRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkgM2wtNCA0SDd2OGwtNCA0VjNoMTZ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2NC4wMDAwMDAsIC03MzEuMDAwMDAwKSB0cmFuc2xhdGUoMjE2NC4wMDAwMDAsIDczMS4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjEgNWwtNCA0SDl2OGwtNCA0VjVoMTZ6IiBvcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtNzMxLjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA3MzEuMDAwMDAwKSB0cmFuc2xhdGUoMTMuMDAwMDAwLCAxMy4wMDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMy4wMDAwMDAsIC0xMy4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAgMTBIMTRWMTRIMTB6IiBvcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtNzMxLjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA3MzEuMDAwMDAwKSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
          />
          <line
            x1={563}
            x2={563}
            y1={116}
            y2={52}
            stroke="#424254"
            strokeWidth={16}
          />
          <line
            x1={563}
            x2={563}
            y1={116}
            y2={116 - 64 * (a.roles[1] / all)}
            stroke="#5383E8"
            strokeWidth={16}
          />
          <image
            x={556}
            y={124}
            width={16}
            height={16}
            href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzlBQTRBRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS4xNCAyYzEuNTggMS4yMSA1LjU4IDUuMDIzIDYuOTc2IDkuOTUzczAgMTAuMDQ3IDAgMTAuMDQ3Yy0yLjc0OS0zLjE2NC01Ljg5My01LjItNi4xOC01LjM4MmwtLjAyLS4wMTNDNS40NSAxMy44MTQgMyA4Ljc5IDMgOC43OWMzLjUzNi44NjcgNC45MyA0LjI3OSA0LjkzIDQuMjc5QzcuNTU4IDguNjk4IDUuMTQgMiA1LjE0IDJ6bTE0Ljk3NiA1LjkwN3MtMS4yNDMgMi40NzEtMS44MTQgNC42MDRjLS4yMzUuODc4LS4yODUgMi4yLS4yOSAzLjA1OHYuMjgyYy4wMDMuMzQ3LjAxLjU2OC4wMS41NjhzLTEuNzM4IDIuMzk3LTMuMzggMy42NzhjLjA4OC0xLjYwMS4wNjItMy40MzUtLjIwOC01LjMzNC45MjgtMi4wMjMgMi44NDYtNS40NTQgNS42ODItNi44NTZ6bS0yLjEyNC01LjMzMXMtMi4zMjUgMy4wNTItMi44MzYgNi4wMjljLS4xMS42MzYtLjIwMSAxLjE5NC0uMjg0IDEuNjk1LS4zNzkuNTg0LS43MyAxLjE2Ni0xLjA1IDEuNzMzLS4wMzMtLjEyNS0uMDYtLjI1LS4wOTUtLjM3NS0uMzAyLTEuMDctLjcwNC0yLjA5NS0xLjE2LTMuMDguMDUzLS4xNDYuMTAzLS4yOS4xNy0uNDM4IDAgMCAxLjgxNC0zLjc4IDUuMjU1LTUuNTY0eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtNzYzLjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA3NjMuMDAwMDAwKSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
          />
          <line
            x1={608}
            x2={608}
            y1={116}
            y2={52}
            stroke="#424254"
            strokeWidth={16}
          />
          <line
            x1={608}
            x2={608}
            y1={116}
            y2={116 - 64 * (a.roles[2] / all)}
            stroke="#5383E8"
            strokeWidth={16}
          />
          <image
            x={601}
            y={124}
            width={16}
            height={16}
            href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzlBQTRBRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUgM2wtNCA0SDd2NGwtNCA0VjNoMTJ6IiBvcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtNzk1LjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA3OTUuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxIDlsLTQgNGgtNHY0bC00IDRWOWgxMnoiIG9wYWNpdHk9Ii4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2NC4wMDAwMDAsIC03OTUuMDAwMDAwKSB0cmFuc2xhdGUoMjE2NC4wMDAwMDAsIDc5NS4wMDAwMDApIHRyYW5zbGF0ZSgxNS4wMDAwMDAsIDE1LjAwMDAwMCkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTE1LjAwMDAwMCwgLTE1LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOCAzTDIxIDMgMjEgNiA2IDIxIDMgMjEgMyAxOHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTY0LjAwMDAwMCwgLTc5NS4wMDAwMDApIHRyYW5zbGF0ZSgyMTY0LjAwMDAwMCwgNzk1LjAwMDAwMCkiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
          />
          <line
            x1={652}
            x2={652}
            y1={116}
            y2={52}
            stroke="#424254"
            strokeWidth={16}
          />
          <line
            x1={652}
            x2={652}
            y1={116}
            y2={116 - 64 * (a.roles[3] / all)}
            stroke="#5383E8"
            strokeWidth={16}
          />
          <image
            x={645}
            y={124}
            width={16}
            height={16}
            href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzlBQTRBRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkgM2wtNCA0SDd2OGwtNCA0VjNoMTZ6IiBvcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtODI3LjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA4MjcuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxIDVsLTQgNEg5djhsLTQgNFY1aDE2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtODI3LjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA4MjcuMDAwMDAwKSB0cmFuc2xhdGUoMTMuMDAwMDAwLCAxMy4wMDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0xMy4wMDAwMDAsIC0xMy4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAgMTBIMTRWMTRIMTB6IiBvcGFjaXR5PSIuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNjQuMDAwMDAwLCAtODI3LjAwMDAwMCkgdHJhbnNsYXRlKDIxNjQuMDAwMDAwLCA4MjcuMDAwMDAwKSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
          />
          <line
            x1={697}
            x2={697}
            y1={116}
            y2={52}
            stroke="#424254"
            strokeWidth={16}
          />
          <line
            x1={697}
            x2={697}
            y1={116}
            y2={116 - 64 * (a.roles[4] / all)}
            stroke="#5383E8"
            strokeWidth={16}
          />
          <image
            x={687}
            y={124}
            width={16}
            height={16}
            href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzlBQTRBRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuODMzIDEwLjgzM0wxNC41IDE3LjUzdi44MDRMMTIuODMzIDIwaC0xLjY2Nkw5LjUgMTguMzMzdi0uODA0bDEuNjY3LTYuNjk2aDEuNjY2ek03IDcuNUw5LjUgMTBsLTEuNjY3IDQuMTY3LTIuNS0yLjVMNi4xNjcgMTBoLTIuNUwyIDcuNWg1em0xNSAwTDIwLjMzMyAxMGgtMi41bC44MzQgMS42NjctMi41IDIuNUwxNC41IDEwIDE3IDcuNWg1ek0xMy43NDMgNWwuNzU3LjgzM3YuODM0bC0xLjY2NyAyLjVoLTEuNjY2TDkuNSA2LjY2N3YtLjgzNEwxMC4yNTcgNWgzLjQ4NnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTY0LjAwMDAwMCwgLTg1OS4wMDAwMDApIHRyYW5zbGF0ZSgyMTY0LjAwMDAwMCwgODU5LjAwMDAwMCkiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
          />
        </g>
      </Container>
    </svg>
  );
}
