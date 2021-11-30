export default function MyReferrals(props){
    const {user} = props;
    return(
        <>This is where {user.firstName} {user.lastName} referrals will go</>
    )
}