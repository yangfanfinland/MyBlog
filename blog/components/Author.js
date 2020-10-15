import { Avatar, Divider } from 'antd'
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://media-exp1.licdn.com/dms/image/C4D03AQEh3bBI4WTEhQ/profile-displayphoto-shrink_400_400/0?e=1607558400&v=beta&t=Q885925EJc6fv1BciFUTHfpRjvmcI8FmPC_aNT23KHc" />
            </div>
            <div className="author-introduction">
                Full Stack Developer
                <Divider>Social accounts</Divider>
                <Avatar size={28} icon={<LinkedinOutlined />} className="account" />
                <Avatar size={28} icon={<GithubOutlined />} className="account" />
            </div>
        </div>
    )
}

export default Author