/*3.测试类：
    main方法中：创建一个管理类的对象，并输入学生信息
                调用设置学生成绩的方法。
                显示学生平均分和总分的方法。
                调用统计每班平均分和总分的方法。
*/

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Manager m1=new Manager(5);
		m1.add();
		m1.sum_avg();
		m1.sumavg_class("一班");
	}

}
