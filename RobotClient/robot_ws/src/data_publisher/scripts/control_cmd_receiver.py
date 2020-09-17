#!/usr/bin/env python

# Import required Python code.
import rospy
from geometry_msgs.msg import Twist


def callback(msg):
    # rospy.loginfo("Received a /cmd_vel message!")
    # rospy.loginfo("Linear Components: [%f, %f, %f]" % (msg.linear.x, msg.linear.y, msg.linear.z))
    # rospy.loginfo("Angular Components: [%f, %f, %f]" % (msg.angular.x, msg.angular.y, msg.angular.z))
    x = msg.linear.x
    dir = msg.angular.z

    if x > 0:
        rospy.loginfo("Received Control command: 'UP'")
    elif x < 0:
        rospy.loginfo("Received Control command: 'Down'")
    elif dir > 0:
        rospy.loginfo("Received Control command: 'Turn Left'")
    elif dir < 0:
        rospy.loginfo("Received Control command: 'Turn Right'")
    else:
        pass


def receiver():
    rospy.init_node('cmd_vel_receiver')
    rospy.Subscriber("/cmd_vel", Twist, callback)
    rospy.spin()


if __name__ == '__main__':
    receiver()
