import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
    FindCardDocument,
    FindCardQuery,
    FindCardQueryVariables
} from "@/generated/graphql";  
import Loading from "./Loading";

export default function CardModal({ previousLocation }:any) { //eslint-disable-line
  const modalRef = useRef<any>(); //eslint-disable-line
  const { id } = useParams();
  const navigate = useNavigate();

    const { data, loading, error } = useQuery<FindCardQuery, FindCardQueryVariables>(FindCardDocument, {
        variables: {
            findCardId: id as string
        }
    });

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);

    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-10 bg-black/70 flex justify-center overflow-y-auto px-6 py-2 sm:px-10 sm:py-6"
      onClick={() => navigate(`${previousLocation.pathname}`)}
    >
        <div
            className="w-full bg-[#323940] min-h-[40vh] mt-16 z-20 relative h-fit max-w-xl rounded-xl shadow-lg p-2 md:px-4 md:py-3 mx-1"
            onClick={e=>e.stopPropagation()}
        >
            <div className="absolute right-1 top-1">
                <Button
                    variant="ghost"
                    onClick={()=>navigate(`${previousLocation.pathname}`)}
                    className="rounded-lg px-2 py-0 hover:bg-gray-500/80"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
            {loading && <Loading className="absolute inset-0" />}
            {error && <p>Oops something went wrong!</p>}
            <h1 className="text-xl font-semibold">{data?.findCard?.title}</h1>
        </div>
    </div>
  )
}
