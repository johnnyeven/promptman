import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

const Editor: NextPageWithLayout = () => {
    return (
        <>
        </>
    )
};

export default Editor;

Editor.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
}