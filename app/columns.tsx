"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const columnHelper = createColumnHelper<Message>();

function Group3(id : string) {
  const iconStyle = {
    paddingTop: "3px",
    width: "1em",
    height: "1em",
  };

  const href = `https://mozilla.cloud.looker.com/dashboards/1471?Message+ID=%25${id?.toUpperCase()}%25`;

  return (
    <Link href={href} target="_blank" rel="noreferrer">
      Results
      <svg
        fill="none"
        viewBox="0 0 8 8"
        className="inline sidebar-icon-external-link"
        aria-hidden="true"
        style={iconStyle}
      >
        <path
          clipRule="evenodd"
          d="m1.71278 0h.57093c.31531 0 .57092.255837.57092.571429 0 .315591-.25561.571431-.57092.571431h-.57093c-.31531 0-.57093.25583-.57093.57143v4.57142c0 .3156.25562.57143.57093.57143h4.56741c.31531 0 .57093-.25583.57093-.57143v-.57142c0-.3156.25561-.57143.57092-.57143.31532 0 .57093.25583.57093.57143v.57142c0 .94678-.76684 1.71429-1.71278 1.71429h-4.56741c-.945943 0-1.71278-.76751-1.71278-1.71429v-4.57142c0-.946778.766837-1.71429 1.71278-1.71429zm5.71629 0c.23083.0002686.43879.13963.52697.353143.02881.069172.04375.143342.04396.218286v2.857141c0 .31559-.25561.57143-.57093.57143-.31531 0-.57092-.25584-.57092-.57143v-1.47771l-1.88006 1.88171c-.14335.14855-.35562.20812-.55523.15583-.19962-.0523-.35551-.20832-.40775-.40811-.05225-.19979.00727-.41225.15569-.55572l1.88006-1.88171h-1.47642c-.31531 0-.57093-.25584-.57093-.571431 0-.315592.25562-.571429.57093-.571429z"
          fill="#5e5e72"
          fillRule="evenodd"
        ></path>
      </svg>
    </Link>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Message = {
  product: 'Desktop' | 'Android'
  release: string
  id: string
  topic: string
  surface: string
  segment: string
  ctrPercent: number
  ctrPercentChange: number
  ctrDashboardLink: string
  previewLink: string
  metrics: string
}

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "release",
    header: "Release",
  },
  {
    accessorKey: "id",
    header: "Message ID",
  },
  {
    accessorKey: "topic",
    header: "Topic",
  },
  {
    accessorKey: "surface",
    header: "Surface",
  }, {
  //   accessorKey: "segment",
  //   header: "Segment",
  // }, {
    accessorKey: "metrics",
    header: "Metrics",
    cell: props => {
      // console.log(props);
      const messageId = props.row.original.id;
      return Group3(messageId);
    }
  }, {
    accessorKey: "previewLink",
    header: "",
    cell: props => {
      if (props.row.original.surface !== 'infobar'
          && props.row.original.surface !== 'spotlight') {
          return ( <div/> );
      }

      // unless / until we get MAKE_LINKABLE landed
      const copyPreviewLink = () => {
        return navigator.clipboard.writeText(props.row.original.previewLink);
      }

      return (
        copyPreviewLink ?
        <Button className="active:bg-gray-400" onClick={copyPreviewLink}>
          Copy Preview Link
        </Button>
        :
        <Link
          className={buttonVariants({ variant: "outline", size: "sm" })}
          href={props.row.original.previewLink}
          target="_blank">
          Preview
        </Link> );
    }
  },
]
