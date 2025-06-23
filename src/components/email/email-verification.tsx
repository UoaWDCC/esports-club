import { ReactNode } from "react";
import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Row,
    Section,
} from "@react-email/components";

interface TapVerifyProps {
    url?: string;
}

export const EsportsLinkVerification = ({ url }: TapVerifyProps) => (
    <Html>
        <Head />
        <Body style={main} className="mx-auto max-w-[560px] bg-[#ffffff] pt-5 pb-12">
            <Preview>Your login code for Esports</Preview>
            <Container className="mx-auto max-w-[560px]">
                <Hr style={{ margin: "40px 0 40px" }} />
                <Heading style={heading}>Hi there,</Heading>
                <p
                    style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#484848",
                        letterSpacing: "-0.25px",
                    }}
                >
                    Click below to verify that we have the right email for you.
                </p>
                <Section className="mt-6">
                    <Button style={button} href={url}>
                        Verify your account
                    </Button>
                </Section>
                <Hr style={{ margin: "40px 0 40px" }} />
                <Row className="mt-[24px]">
                    <Column align="center">
                        <table>
                            <tbody>
                                <tr>
                                    <FooterLinks url="https://esports.wdcc.co.nz/">
                                        Auckland University Esports Club
                                    </FooterLinks>
                                </tr>
                            </tbody>
                        </table>
                    </Column>
                </Row>
            </Container>
        </Body>
    </Html>
);

const FooterLinks = ({ children, url }: { url?: string; children?: ReactNode }) => {
    return (
        <td className="px-[8px]">
            <Link
                style={{
                    textDecoration: "underline",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#484848",
                }}
                href={url}
            >
                {children}
            </Link>
        </td>
    );
};

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const heading = {
    fontSize: "24px",
    letterSpacing: "-0.25px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
};

const button = {
    backgroundColor: "#5e6ad2",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "11px 23px",
};
