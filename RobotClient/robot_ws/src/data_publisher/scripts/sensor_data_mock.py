#!/usr/bin/env python

# Import required Python code.
# import roslib
import rospy
import sys
from std_msgs.msg import Int64
from random import seed
from random import random


class SensorDataMock:
    def __init__(self):
        # Create a publisher for our custom message.
        pub = rospy.Publisher('sensor_data', Int64, queue_size=10)
        rate = rospy.Rate(5)  # 25hz

        while not rospy.is_shutdown():
            msg = int(random() * 100)
            # rospy.loginfo(str(msg))
            pub.publish(msg)
            rate.sleep()


if __name__ == '__main__':
    rospy.init_node('sensor_data_mock')

    try:
        node = SensorDataMock()
    except rospy.ROSInterruptException:
        pass
