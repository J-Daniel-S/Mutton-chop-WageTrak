import styled from 'styled-components';

export const UserMain = styled.main`
	width: 100vw;
	z-index: 0;
	position: absolute;
`;

export const BlockButton = styled.section`
	text-align: center;
	font-weight: bold;
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	font-size: 1.7em;
	min-height: 8vh;
	padding: 0.5vh 0;
`;

export const FooterButton = styled.section`
	text-align: center;
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	font-size: 1.4em;
	height: 8vh;
	position: absolute;
	bottom: 0;
	width: inherit;
`;

export const LargeTitleLeft = styled.div`
	flex-grow: 3;
	font-size: 2em;
	text-transform: capitalize;
`;

export const LargeTitleMargin = styled.div`
	flex-grow: 3;
	font-size: 2em;
	margin: 0 4vw;
	text-transform: capitalize;
`;

export const FlexHeader = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: baseline;
	height: 8vh;
	margin: 2vh 2vw;
`;

export const IconButtonDiv = styled.div`
	flex-grow: 0;
	padding: 2vh 2vw;
`;

export const LargeListArticle = styled.article`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: inherit;
	overflow-y: auto;
	overflow-x: hidden;
	margin: 4vh 0;
`;

export const LargeUl = styled.ul`
	list-style-type: none;
	padding: 0;
`;

export const AppTitle = styled.section`
	display: flex;
	text-align: left;
	font-weight: 700;
	font-size: 2em;
	width: 100vw;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	height: 8.5vh;
		
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	animation: .5s ease 0s 1 fadeIn;
`;

export const LargeThumbnail = styled.section`
	display: flex;
	text-align: left;
	font-weight: 400;
	width: 85vw;
	cursor: pointer;
	margin: 1vh 0;
	justify-content: space-between;
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	height: 8.5vh;
		
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	animation: .5s ease 0s 1 fadeIn;
`;

export const SmallThumbnail = styled.p`
	display: flex;
	text-align: left;
	font-weight: 400;
	width: 85vw;
	cursor: pointer;
	margin: 0.5vh 2vw;
	justify-content: space-between;
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	height: 5vh;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	animation: .5s ease 0s 1 fadeIn;
`;

export const Backdrop = styled.div`
	height: 7vh;
	width: 100vw;
	position: fixed;
	z-index: 49;
	opacity: 0.1;
`;

export const AddBackdrop = styled.div`
    opacity: 0.1;
    height: 50vh;
    width: 100vw;
    background-color: #ccc;
    position: fixed;
    z-index: 90;
    bottom: 0;
`;

export const JobArticle = styled.article`
	text-align: left;
	border: 1px solid #ccc;
	width: 100vw;
	height: 81vh;
	z-index: 50;
	position: fixed;
	margin: 12vh 0 0 0;
	background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
	overflow-y: hidden;
	font-size: 1.05em;
	overflow-y: auto;

	@keyframes slideFromBottom {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0);
		}
	}

	animation: .5s ease-out 0s 1 slideFromBottom;
`;

export const PeriodsArticle = styled.article`
	text-align: left;
	width: 100vw;
	height: 80vh;
	z-index: 60;
	position: fixed;
	margin: 20vh 0 0 0;
	background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
	overflow-y: auto;
	overflow-x: hidden;
	font-size: 1.1em;

	@keyframes slideFromBottom {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	animation: .5s ease-out 0s 1 slideFromBottom;

	@media(max-width: 600) {
		height: 65vh;
	}
`;

export const PeriodArticle = styled.article`
    text-align: left;
    width: 100vw;
    height: 64vh;
    z-index: 60;
    position: fixed;
    margin: 28vh 0 0 0;
    background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
    overflow-y: auto;
	font-size: 1.1em;
	
	@keyframes slideFromBottom {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	animation: .5s ease-out 0s 1 slideFromBottom;
`;

export const ShiftArticle = styled.article`
	text-align: left;
    width: 100vw;
    height: 57vh;
    z-index: 65;
    position: fixed;
    margin: 36vh 0 0 0;
    background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
    overflow-y: auto;
	font-size: 1.1em;
	
	@keyframes slideFromBottom {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	animation: .5s ease-out 0s 1 slideFromBottom;
`;

export const AddJobArticle = styled.article`
    height: 60vh;
    width: 100vw;
    position: fixed;
    z-index: 100;
	background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
	font-size: 1.1em;

	@keyframes slideFromTop {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	animation: .5s ease-out 0s 1 slideFromTop;
`;

export const AddShiftArticle = styled.article`
	height: 85vh;
	width: 100vw;
	position: fixed;
	z-index: 100;
	background-image: linear-gradient(to RIGHT, #A3B4C8, #CFD8E2);
	
	@keyframes slideFromTop {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	animation: .5s ease-out 0s 1 slideFromTop;
`;

export const RoundedButton = styled.div`
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	border-radius: 5px;
	height: 8vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: baseline;
`;

export const FlexDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const Flex3 = styled.div`
	flex-grow: 3;
`;

export const Flex0 = styled.div`
	flex-grow: 0;
`;

export const FlexText = styled.p`
	margin: 1.5vh 1vw;
`;

export const LeftButtonText = styled.p`
	font-weight: bold;
	font-size: 1.15em;
	text-transform: capitalize;
	margin: 0 2vw;
`;

export const PaySection = styled.section`
	margin: 2vh 2vw;
`;

export const Hr = styled.hr`
	margin: 1vh 0;
`;

export const RoundedButtonCentered = styled.div`
	background-image: linear-gradient(to bottom, #0a5472, #9fb1c6);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	border-radius: 5px;
	height: 7vh;
	width: 100vw;
	display: flex;
	justify-content: center;

`;

export const CenterButtonText = styled.p`
	font-weight: bold;
	font-size: 1.15em;
	text-transform: capitalize;
	margin: 1.5vh 0;
`;

export const ShadowButton = styled.span`
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	border-radius: 5px;
	font-size: 1.1em;
	background-color: #9fb1c6;
`;

export const ListSection = styled.section`
	width: 100vw;
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	list-style-type: none;
	padding: 0;
`;

export const FormLabel = styled.label`
	margin: 1vh 2vw;
`;

export const FormInput = styled.input`
	width: 100vw;
`;

export const Title = styled.p`
	font-weight: bold;
	font-size: 1.1em;
`;

export const EditModal = styled.article`
	height: 40vh;
	width: 100vw;
`;

export const Navbar = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: 7vh;
	width: 100vw;
	margin: 0;
	background-image: linear-gradient(to bottom, #0a5472, #a3b4c8);
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
`;

export const BackButton = styled.i`
	margin: 1vh;
	color: #022E51;
	cursor: pointer;
`;

export const LogoutButton = styled.i`
	margin: 0;
	align-self: flex-end;
	color: #022E51;
	cursor: pointer;
`;

export const LoginPage = styled.main`
	height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(to RIGHT, #cfd8e2, #dfe5ec);
    font-size: 1.1em;

    animation: fadeIn ease .5s;
    -webkit-animation: fadeIn ease .5s;
    -moz-animation: fadeIn ease .5s;
    -o-animation: fadeIn ease .5s;

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @-moz-keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @-o-keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

}

@media (min-width: 700) {
    body {
        font-size: 1.8em;
    }
}

@media (min-width: 900) {
    body {
        font-size: 2.5em;
    }
}
`;

export const LoginButtonContainer = styled.div`
	margin: 0 0 1vh 2vw;
	@media only screen and (max-width: 600) {
		margin: 0 0 2vh 5vw;
	}
	
`;