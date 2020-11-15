import java.util.Scanner;

/*2.设计一个管理类：
         属性：学生对象数组，平均分，总分
         方法：在构造方法中实现学生对象的创建及初始化。
               设置学生成绩。
               统计所有学生的平均分，总分。
               按班级统计每班的平均分和总分。
*/
public class Manager {
	 Student []stu;
	 double avg;
	 double sum;
	 Manager(int n){
		 stu=new Student[n];
		 Scanner sc=new Scanner(System.in);
		 for(int i=0;i<stu.length;i++) {
			 System.out.println("请输入第"+(i+1)+"个学生信息：");
			 String num=sc.next();
			 String name=sc.next();
			 String classRoom=sc.next();
			 stu[i]=new Student(num,name,classRoom);
		 }
	 }
	 void add() {
		 Scanner sc=new Scanner(System.in);
		 for(int i=0;i<stu.length;i++) {
			 System.out.println("请输入第"+(i+1)+"个学生成绩：");
			 double score=sc.nextDouble();
			 stu[i].set(score);
		 }
	 }
	 void sum_avg() {
		 sum=0;
		 for(int i=0;i<stu.length;i++) {
			 sum=sum+stu[i].score;
		 }
		 avg=sum/stu.length;
		 System.out.println("总分为："+sum+"  平均分为："+avg);
	 }
	 void sumavg_class(String classRoom) {
		 double sum=0,avg=0; int k=0;
		 for(int i=0;i<stu.length;i++) {
			 if(stu[i].classRoom.equals(classRoom)) {
				 sum=sum+stu[i].score;
				 k++;
			 }
		 }
		 avg=sum/k;
		 System.out.println("总分为："+sum+"  平均分为："+avg);
	 }
	 
}
